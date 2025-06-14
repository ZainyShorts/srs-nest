import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto): Promise<import("./schema/course.schema").Course>;
    findAll(coursename?: string, active?: boolean, special?: boolean): Promise<import("./schema/course.schema").Course[]>;
    findOne(id: string): Promise<import("./schema/course.schema").Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<import("./schema/course.schema").Course>;
    remove(id: string): Promise<import("./schema/course.schema").Course>;
}
