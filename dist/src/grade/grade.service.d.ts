import { Grade, GradeDocument } from './schema/schema.garde';
import { CourseDocument } from 'src/course/schema/course.schema';
import { Model } from 'mongoose';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { CreateGradeDto } from './dto/create-grade.dto';
export declare class GradeService {
    private readonly GradeModel;
    private readonly CourseModel;
    constructor(GradeModel: Model<GradeDocument>, CourseModel: Model<CourseDocument>);
    create(createDtos: CreateGradeDto[]): Promise<any>;
    findAll(className?: string, section?: string, courseId?: string, teacherId?: string, term?: string): Promise<Grade[]>;
    findGradesByStudentAndCourse(studentId: any, courseId: string): Promise<any>;
    findOne(id: string, className?: string, section?: string, courseId?: string, teacherId?: string): Promise<Grade>;
    updateMany(grades: UpdateGradeDto[]): Promise<Grade[]>;
    remove(className?: string, section?: string, courseId?: string, teacherId?: string): Promise<any>;
}
