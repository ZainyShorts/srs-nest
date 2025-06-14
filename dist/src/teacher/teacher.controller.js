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
exports.TeacherController = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("./teacher.service");
const create_teacher_dto_1 = require("./dto/create-teacher.dto");
const update_teaacher_dto_1 = require("./dto/update-teaacher.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../../utils/multer.config");
let TeacherController = class TeacherController {
    constructor(teacherService) {
        this.teacherService = teacherService;
    }
    async findAll(page = 1, limit = 10, startDate, endDate, department, email) {
        return this.teacherService.findAll(Number(page), Number(limit), startDate, endDate, department, email);
    }
    async addTeacher(createTeacherDto) {
        return this.teacherService.addTeacher(createTeacherDto);
    }
    async assignCourse(teacherId, courseId) {
        return this.teacherService.assignCourseToTeacher(teacherId, courseId);
    }
    async getAssignedCourses(teacherId) {
        return this.teacherService.getAssignedCoursesForTeacher(teacherId);
    }
    async removeCourseAssignment(teacherId, courseId) {
        return this.teacherService.removeCourseAssignment(teacherId, courseId);
    }
    async getUnassignedCourses(departmentId) {
        if (!departmentId) {
            throw new Error('departmentId is required');
        }
        return this.teacherService.getUnassignedCoursesByTeacherId(departmentId);
    }
    async findOne(id) {
        return this.teacherService.findOne(id);
    }
    async updateTeacher(id, updateTeacherDto) {
        return this.teacherService.updateTeacher(id, updateTeacherDto);
    }
    async delete(id) {
        return this.teacherService.delete(id);
    }
    async importStudents(file) {
        if (!file) {
            throw new Error('File is required');
        }
        return this.teacherService.importStudents(file.path);
    }
};
exports.TeacherController = TeacherController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('department')),
    __param(5, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "addTeacher", null);
__decorate([
    (0, common_1.Get)('assign-course'),
    __param(0, (0, common_1.Query)('teacherId')),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "assignCourse", null);
__decorate([
    (0, common_1.Get)('get/assignedCourses'),
    __param(0, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getAssignedCourses", null);
__decorate([
    (0, common_1.Get)('remove-course'),
    __param(0, (0, common_1.Query)('teacherId')),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "removeCourseAssignment", null);
__decorate([
    (0, common_1.Get)('unassigned-courses'),
    __param(0, (0, common_1.Query)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getUnassignedCourses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_teaacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "updateTeacher", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerOptionsForXlxs)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "importStudents", null);
exports.TeacherController = TeacherController = __decorate([
    (0, common_1.Controller)('teachers'),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService])
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map