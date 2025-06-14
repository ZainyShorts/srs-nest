import { TeacherService } from 'src/teacher/teacher.service';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from 'src/student/student.service';
export declare class UserService {
    private readonly teacherService;
    private readonly studentService;
    private jwtService;
    constructor(teacherService: TeacherService, studentService: StudentService, jwtService: JwtService);
    validateUser(email: string, password: string, type: string): Promise<(import("mongoose").Document<unknown, {}, import("../teacher/schema/schema.teacher").Teacher> & import("../teacher/schema/schema.teacher").Teacher & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | (import("mongoose").Document<unknown, {}, import("../student/schema/student.schema").Student> & import("../student/schema/student.schema").Student & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    generateJwt(user: any): string;
}
