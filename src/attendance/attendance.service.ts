import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance, AttendanceDocument } from './schema/schema.attendace';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>) {}

  async markAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const attendance = new this.attendanceModel(createAttendanceDto);
    return attendance.save();
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceModel.find().populate('teacherId courseId studentId').exec();
  }

  async findByCourse(courseId: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ courseId }).populate('teacherId studentId').exec();
  }

  async findByStudent(studentId: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ studentId }).populate('teacherId courseId').exec();
  }
}
