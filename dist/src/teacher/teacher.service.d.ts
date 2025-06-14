import { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Course } from 'src/course/schema/course.schema';
import { Teacher } from './schema/schema.teacher';
import { UpdateTeacherDto } from './dto/update-teaacher.dto';
import { ResponseDto } from 'src/dto/response.dto';
export declare class TeacherService {
    private readonly teacherModel;
    private readonly courseModel;
    private readonly departmentModel;
    constructor(teacherModel: Model<Teacher>, courseModel: Model<Course>, departmentModel: Model<Course>);
    addTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher | ResponseDto>;
    updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher>;
    assignCourseToTeacher(teacherId: string, courseId: string): Promise<{
        teacher: Teacher;
        course: Course;
    }>;
    getAssignedCoursesForTeacher(teacherId: string): Promise<Course[]>;
    getUnassignedCoursesByTeacherId(teacherId: string): Promise<any>;
    removeCourseAssignment(teacherId: string, courseId: string): Promise<{
        teacher: Teacher;
        course: Course;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<Teacher>;
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
    importStudents(filePath: string): Promise<any>;
    validateTeacher(data: {
        email: string;
        password: string;
    }): Promise<import("mongoose").Document<unknown, {}, Teacher> & Teacher & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
