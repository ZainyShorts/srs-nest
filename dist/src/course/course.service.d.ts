import { Model } from 'mongoose';
import { Course, CourseDocument } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ScheduleDocument } from 'src/schedule/schema/schedule.schema';
export declare class CourseService {
    private courseModel;
    private courseSchedule;
    constructor(courseModel: Model<CourseDocument>, courseSchedule: Model<ScheduleDocument>);
    create(createCourseDto: CreateCourseDto): Promise<Course>;
    findAll(coursename?: string, active?: boolean, special?: boolean): Promise<Course[]>;
    findOne(id: string): Promise<Course>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<Course>;
}
