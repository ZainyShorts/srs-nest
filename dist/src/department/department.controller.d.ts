import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<import("./schema/department.schema").Department>;
    findAll(): Promise<import("./schema/department.schema").Department[]>;
    findOne(id: string): Promise<import("./schema/department.schema").Department>;
    update(id: string, updateData: Partial<CreateDepartmentDto>): Promise<import("./schema/department.schema").Department>;
    remove(id: string): Promise<import("./schema/department.schema").Department>;
}
