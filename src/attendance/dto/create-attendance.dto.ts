import { IsNotEmpty, IsString, IsMongoId, IsEnum } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsMongoId()
  teacherId: string; // Reference to Teacher

  @IsNotEmpty()
  @IsMongoId()
  courseId: string; // Reference to Course

  @IsNotEmpty()
  @IsMongoId()
  studentId: string; // Reference to Student

  @IsNotEmpty()
  @IsString()
  date: string; // Format: YYYY-MM-DD

  @IsNotEmpty()
  @IsEnum(['Present', 'Absent', 'Late'])
  status: string;
}
