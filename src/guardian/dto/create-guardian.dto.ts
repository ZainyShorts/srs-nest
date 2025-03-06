import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGuardianDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  relation: string;

  @IsNotEmpty()
  @IsString()
  profession: string;

  @IsNotEmpty()
  @IsString()
  guardianPhoto: string;


}
