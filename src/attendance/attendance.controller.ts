import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './schema/schema.attendace';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async markAttendance(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.markAttendance(createAttendanceDto);
  }

  @Get()
  async getAllAttendance(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @Get('/course/:courseId')
  async getAttendanceByCourse(@Param('courseId') courseId: string): Promise<Attendance[]> {
    return this.attendanceService.findByCourse(courseId);
  }

  @Get('/student/:studentId')
  async getAttendanceByStudent(@Param('studentId') studentId: string): Promise<Attendance[]> {
    return this.attendanceService.findByStudent(studentId);
  }
}
