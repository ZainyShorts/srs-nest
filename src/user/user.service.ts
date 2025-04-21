import { Injectable } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'utils/enum';

@Injectable()
export class UserService {
  constructor(
    private readonly teacherService: TeacherService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string, type: UserRole) {
    if (type === UserRole.Teacher) {
      return this.teacherService.validateTeacher({ email, password });
    }
  }

  generateJwt(user: any) {
    return this.jwtService.sign({ sub: user._id, email: user.email });
  }
}
