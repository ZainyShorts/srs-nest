import { IsEmail, IsNotEmpty, IsString, IsDate, Matches } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  rollNo: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  class: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsDate()
  dob: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsDate()
  enrollDate: string;

  @IsNotEmpty()
  @IsDate()
  expectedGraduation: string;

  @IsNotEmpty()
  @IsString()
  guardianName: string;

  @IsNotEmpty()
  @IsEmail()
  guardianEmail: string;

  @IsNotEmpty()
  @IsString()
  guardianPhone: string;

  @IsNotEmpty()
  @IsString()
  guardianPhoto: string;

  @IsNotEmpty()
  @IsString()
  guardianRelation: string;

  @IsNotEmpty()
  @IsString()
  guardianProfession: string;

  @IsNotEmpty()
  @IsString()
  profilePhoto: string;
}
