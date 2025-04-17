import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance, AttendanceDocument } from './schema/schema.attendace';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async markAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    const attendance = new this.attendanceModel(createAttendanceDto);
    return attendance.save();
  }

  async summarizeAttendanceByStatus(data: any[]) {
    try {
      const summary = {
        Present: { count: 0, students: [] },
        Absent: { count: 0, students: [] },
        Late: { count: 0, students: [] },
        Excused: { count: 0, students: [] },
      };

      for (const student of data) {
        const status = student.attendance;
        if (summary[status]) {
          summary[status].count += 1;
          summary[status].students.push(student.studentName);
        }
      }

      const total = data.length;

      const result = Object.entries(summary).map(
        ([status, { count, students }]) => ({
          status,
          percentage: total ? Math.round((count / total) * 100) : 0,
          count,
          students,
        }),
      );
      return result;
    } catch (error) {
      console.error('Error summarizing attendance:', error);
      throw new InternalServerErrorException('Could not summarize attendance');
    }
  }

  async getTeacherViewAttendance(
    courseId: string,
    teacherId: string,
    room: string,
    section: string,
    date: string,
  ): Promise<Attendance[]> {
    try {
      if (!courseId || !teacherId || !room || !section || !date) {
        throw new BadRequestException('Missing required parameters');
      }

      const filters: any = {
        teacherId,
        courseId,
        class: room,
        section,
        date,
      };

      let result: any = await this.attendanceModel.findOne(filters).exec();

      if (result != null) {
        const attendanceReport = await this.summarizeAttendanceByStatus(
          result['students'],
        );
        result = result.toObject();
        result['attendanceReport'] = attendanceReport;
      }

      return result;
    } catch (error) {
      console.error('Error in getTeacherViewAttendance:', error);
      throw new InternalServerErrorException('Failed to retrieve attendance');
    }
  }

  async findByStudent(studentId: string): Promise<Attendance[]> {
    return this.attendanceModel
      .find({ studentId })
      .populate('teacherId courseId')
      .exec();
  }
}
