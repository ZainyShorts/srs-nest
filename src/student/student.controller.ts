import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './schema/student.schema';

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
}
