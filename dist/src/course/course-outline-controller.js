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
exports.CourseOutlineController = void 0;
const common_1 = require("@nestjs/common");
const course_outline_service_1 = require("./course-outline.service");
const create_course_outline_dto_1 = require("./dto/create-course-outline.dto");
let CourseOutlineController = class CourseOutlineController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        console.log('hit');
        return this.service.create(dto);
    }
    async findAll() {
        return this.service.findAll();
    }
    async findAllByTeacherId(teacherId, status) {
        if (!teacherId) {
            throw new common_1.BadRequestException('teacherId is required');
        }
        return this.service.findAllByTeacherId(teacherId, status);
    }
    async updateStatus(id, dto) {
        return this.service.updateStatus(id, dto);
    }
    async remove(id) {
        await this.service.remove(id);
        return { message: 'Deleted successfully' };
    }
};
exports.CourseOutlineController = CourseOutlineController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_outline_dto_1.CreateCourseOutlineDto]),
    __metadata("design:returntype", Promise)
], CourseOutlineController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseOutlineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('teacher'),
    __param(0, (0, common_1.Query)('teacherId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseOutlineController.prototype, "findAllByTeacherId", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_outline_service_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], CourseOutlineController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseOutlineController.prototype, "remove", null);
exports.CourseOutlineController = CourseOutlineController = __decorate([
    (0, common_1.Controller)('course-outline'),
    __metadata("design:paramtypes", [course_outline_service_1.CourseOutlineService])
], CourseOutlineController);
//# sourceMappingURL=course-outline-controller.js.map