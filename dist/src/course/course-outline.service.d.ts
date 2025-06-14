import { Model } from 'mongoose';
import { CourseOutline, CourseOutlineDocument } from './schema/course-outline.schema';
import { CreateCourseOutlineDto } from './dto/create-course-outline.dto';
export declare class CourseOutlineService {
    private courseOutlineModel;
    constructor(courseOutlineModel: Model<CourseOutlineDocument>);
    create(dto: CreateCourseOutlineDto): Promise<CourseOutline>;
    findAllByTeacherId(teacherId: string, status?: string): Promise<CourseOutline[]>;
    findAll(): Promise<CourseOutline[]>;
    remove(id: string): Promise<void>;
    updateStatus(id: string, dto: UpdateStatusDto): Promise<CourseOutline>;
}
export declare class UpdateStatusDto {
    status: string;
}
