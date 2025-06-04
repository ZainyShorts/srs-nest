import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './schema/student.schema';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsForXlxs, UploadedFileType } from 'utils/multer.config';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // attendance.controller.ts

  @Get('attendance')
  async getAttendanceByStudentId(@Query('studentId') studentId: string) {
    if (!studentId) {
      throw new BadRequestException('studentId is required');
    }
    return this.studentService.getAttendanceByStudentId(studentId);
  }

  @Post('add')
  
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student | ResponseDto> {
    return this.studentService.create(createStudentDto);
  }

  @Get('course')
  async getStudentCourseAttendance(
    @Query('studentId') studentId: string,
    @Query('courseCode') courseCode: string,
  ) {
    return this.studentService.getStudentAttendanceByCourseCode(
      courseCode,
      studentId,
    );
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('studentId') studentId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('className') className?: string,
  ) {
    return this.studentService.findAll(
      Number(page),
      Number(limit),
      studentId,
      startDate,
      endDate,
      className,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file', multerOptionsForXlxs))
  async importStudents(@UploadedFile() file: UploadedFileType) {
    if (!file) {
      throw new Error('File is required');
    }
    return this.studentService.importStudents(file.path);
  }
}
