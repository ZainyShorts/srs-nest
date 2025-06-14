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
exports.UpdateStatusDto = exports.CourseOutlineService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_outline_schema_1 = require("./schema/course-outline.schema");
const common_1 = require("@nestjs/common");
let CourseOutlineService = class CourseOutlineService {
    constructor(courseOutlineModel) {
        this.courseOutlineModel = courseOutlineModel;
    }
    async create(dto) {
        try {
            const created = new this.courseOutlineModel(dto);
            return await created.save();
        }
        catch (error) {
            throw error;
        }
    }
    async findAllByTeacherId(teacherId, status) {
        try {
            const query = { teacherId };
            if (status) {
                query.status = status;
            }
            return await this.courseOutlineModel.find(query).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve course outlines');
        }
    }
    async findAll() {
        try {
            return await this.courseOutlineModel.find().exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve course outlines');
        }
    }
    async remove(id) {
        const deleted = await this.courseOutlineModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Course outline not found');
    }
    async updateStatus(id, dto) {
        try {
            const updated = await this.courseOutlineModel.findByIdAndUpdate(id, { status: dto.status }, { new: true });
            if (!updated)
                throw new common_1.NotFoundException('Course outline not found');
            return updated;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CourseOutlineService = CourseOutlineService;
exports.CourseOutlineService = CourseOutlineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_outline_schema_1.CourseOutline.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseOutlineService);
class UpdateStatusDto {
}
exports.UpdateStatusDto = UpdateStatusDto;
//# sourceMappingURL=course-outline.service.js.map