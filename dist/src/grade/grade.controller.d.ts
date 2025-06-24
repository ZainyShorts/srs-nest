import { GradeService } from './grade.service';
import { CreateGradeListDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
export declare class GradeController {
    private readonly service;
    constructor(service: GradeService);
    create(dto: CreateGradeListDto): Promise<any>;
    findAll(className: string, section: string, courseId: string, teacherId: string, term?: string): Promise<import("./schema/schema.garde").Grade[]>;
    findGradesByStudentAndCourse(courseId: string, studentId: string): Promise<any>;
    findOne(id: string, className?: string, section?: string, courseId?: string, teacherId?: string): Promise<import("./schema/schema.garde").Grade>;
    updateGrades(updateGradeListDto: UpdateGradeDto[]): Promise<import("./schema/schema.garde").Grade[]>;
    remove(className?: string, section?: string, courseId?: string, teacherId?: string): Promise<any>;
}
