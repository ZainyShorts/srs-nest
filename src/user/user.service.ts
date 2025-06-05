import { Injectable } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'utils/enum';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class UserService {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, type: UserRole) {
    if (type === UserRole.Teacher) {
      console.log('type',type)
      return this.teacherService.validateTeacher({ email, password });
    }
    if (type === UserRole.Student) {
      return this.studentService.validateStudent({ email, password });
    }
  }

  generateJwt(user: any) {
    return this.jwtService.sign({ sub: user._id, email: user.email });
  }
}
