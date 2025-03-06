import { Controller, Get, Post, Body, Param, Query, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './schema/student.schema';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptionsForXlxs, UploadedFileType } from 'utils/multer.config';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post("add")
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('rollNo') rollNo?: string,
  ) {
    return this.studentService.findAll(Number(page), Number(limit),rollNo);
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
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file', multerOptionsForXlxs))
  async importStudents(@UploadedFile() file: UploadedFileType,) {
    if (!file) {
      throw new Error('File is required');
    }
    return this.studentService.importStudents(file.path);
  }

}
