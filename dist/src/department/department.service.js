"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const department_schema_1 = require("./schema/department.schema");
const course_schema_1 = require("../course/schema/course.schema");
const schedule_schema_1 = require("../schedule/schema/schedule.schema");
let DepartmentService = class DepartmentService {
    constructor(departmentModel, courseModel, scheduleModel) {
        this.departmentModel = departmentModel;
        this.courseModel = courseModel;
        this.scheduleModel = scheduleModel;
    }
    async create(createDepartmentDto) {
        const dp = await this.departmentModel.findOne({ departmentName: createDepartmentDto.departmentName });
        if (dp) {
            throw new common_1.ConflictException('Department already exist');
        }
        const department = new this.departmentModel(createDepartmentDto);
        return department.save();
    }
    async findAll() {
        return this.departmentModel.find().exec();
    }
    async findOne(id) {
        const department = await this.departmentModel.findById(id).exec();
        if (!department) {
            throw new common_1.NotFoundException('Department not found');
        }
        return department;
    }
    async update(id, updateData) {
        return this.departmentModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async remove(id) {
        const dp = await this.departmentModel.findOne({ _id: id });
        if (dp == null) {
            console.log(`Department with ID ${id} not found`);
            throw new common_1.BadRequestException('Department not found');
        }
        const course = await this.courseModel.find({ departmentId: dp._id });
        if (course.length > 0) {
            throw new common_1.BadRequestException('Cannot delete. This department is linked to existing courses.');
        }
        return this.departmentModel.findByIdAndDelete(id);
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(2, (0, mongoose_1.InjectModel)(schedule_schema_1.Schedule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DepartmentService);
//# sourceMappingURL=department.service.js.map