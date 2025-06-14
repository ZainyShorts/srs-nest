import { CourseOutlineService, UpdateStatusDto } from './course-outline.service';
import { CreateCourseOutlineDto } from './dto/create-course-outline.dto';
import { CourseOutline } from './schema/course-outline.schema';
export declare class CourseOutlineController {
    private readonly service;
    constructor(service: CourseOutlineService);
    create(dto: CreateCourseOutlineDto): Promise<CourseOutline>;
    findAll(): Promise<CourseOutline[]>;
    findAllByTeacherId(teacherId: string, status?: string): Promise<CourseOutline[]>;
    updateStatus(id: string, dto: UpdateStatusDto): Promise<CourseOutline>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
