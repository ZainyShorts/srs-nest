import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @IsNotEmpty()
  @IsString()
  courseName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  creditHours: number;

  @IsNotEmpty()
  @IsString()
  instructor: string;
}
