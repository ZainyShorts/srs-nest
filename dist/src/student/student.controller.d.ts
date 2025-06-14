import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './schema/student.schema';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UploadedFileType } from 'utils/multer.config';
import { ResponseDto } from 'src/dto/response.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    getAttendanceByStudentId(studentId: string): Promise<{
        courseId: string;
        courseName: string;
        attendancePercentage: number;
    }[]>;
    create(createStudentDto: CreateStudentDto): Promise<Student | ResponseDto>;
    getStudentCourseAttendance(studentId: string, courseCode: string): Promise<({
        date: string;
        status: string;
    } | {
        courseCode: string;
    })[]>;
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
    findOne(id: string): Promise<Student>;
    delete(id: string): Promise<{
        message: string;
    }>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<ResponseDto | Student>;
    importStudents(file: UploadedFileType): Promise<any>;
}
