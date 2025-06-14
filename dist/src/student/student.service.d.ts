import { Model } from 'mongoose';
import { Student } from './schema/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { GuardianService } from '../guardian/guardian.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Guardian } from '../guardian/schema/guardian.schema';
import { ResponseDto } from 'src/dto/response.dto';
import { Attendance } from 'src/attendance/schema/schema.attendace';
import { Course } from 'src/course/schema/course.schema';
export declare class StudentService {
    private studentModel;
    private readonly guardianService;
    private guardianModel;
    private attendanceModel;
    private courseModel;
    constructor(studentModel: Model<Student>, guardianService: GuardianService, guardianModel: Model<Guardian>, attendanceModel: Model<Attendance>, courseModel: Model<Course>);
    create(createStudentDto: CreateStudentDto): Promise<Student | ResponseDto>;
    findById(id: string): Promise<Student>;
    findAll(page?: number, limit?: number, studentId?: string, startDate?: string, endDate?: string, className?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, Student> & Student & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        totalPages: number;
        totalRecordsCount: number;
        currentPage: number;
        limit: number;
    }>;
    studentCount(className: string, section: string): Promise<number>;
    findOne(id: string): Promise<Student>;
    delete(id: string): Promise<{
        message: string;
    }>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student | ResponseDto>;
    importStudents(filePath: string): Promise<any>;
    getAttendanceByStudentId(studentObjectId: string): Promise<{
        courseId: string;
        courseName: string;
        attendancePercentage: number;
    }[]>;
    getStudentAttendanceByCourseCode(courseCode: string, studentId: string): Promise<({
        date: string;
        status: string;
    } | {
        courseCode: string;
    })[]>;
    validateStudent(data: {
        email: string;
        password: string;
    }): Promise<import("mongoose").Document<unknown, {}, Student> & Student & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
