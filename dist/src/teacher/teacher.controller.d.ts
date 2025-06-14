import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './schema/schema.teacher';
import { UpdateTeacherDto } from './dto/update-teaacher.dto';
import { UploadedFileType } from 'utils/multer.config';
import { ResponseDto } from 'src/dto/response.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    findAll(page?: number, limit?: number, startDate?: string, endDate?: string, department?: string, email?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, Teacher> & Teacher & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalPages: number;
        totalRecordsCount: number;
        currentPage: number;
        limit: number;
    }>;
    addTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher | ResponseDto>;
    assignCourse(teacherId: string, courseId: string): Promise<{
        teacher: Teacher;
        course: import("../course/schema/course.schema").Course;
    }>;
    getAssignedCourses(teacherId: string): Promise<import("../course/schema/course.schema").Course[]>;
    removeCourseAssignment(teacherId: string, courseId: string): Promise<{
        teacher: Teacher;
        course: import("../course/schema/course.schema").Course;
    }>;
    getUnassignedCourses(departmentId: string): Promise<any>;
    findOne(id: string): Promise<Teacher>;
    updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher>;
    delete(id: string): Promise<{
        message: string;
    }>;
    importStudents(file: UploadedFileType): Promise<any>;
}
