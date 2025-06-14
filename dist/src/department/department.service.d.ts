import { Model } from 'mongoose';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department, DepartmentDocument } from './schema/department.schema';
import { CourseDocument } from 'src/course/schema/course.schema';
import { ScheduleDocument } from 'src/schedule/schema/schedule.schema';
export declare class DepartmentService {
    private departmentModel;
    private courseModel;
    private scheduleModel;
    constructor(departmentModel: Model<DepartmentDocument>, courseModel: Model<CourseDocument>, scheduleModel: Model<ScheduleDocument>);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    findAll(): Promise<Department[]>;
    findOne(id: string): Promise<Department>;
    update(id: string, updateData: Partial<CreateDepartmentDto>): Promise<Department>;
    remove(id: string): Promise<Department>;
}
