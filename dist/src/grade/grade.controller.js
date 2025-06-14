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
exports.GradeController = void 0;
const common_1 = require("@nestjs/common");
const grade_service_1 = require("./grade.service");
const create_grade_dto_1 = require("./dto/create-grade.dto");
let GradeController = class GradeController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto.grades);
    }
    findAll(className, section, courseId, teacherId) {
        return this.service.findAll(className, section, courseId, teacherId);
    }
    findGradesByStudentAndCourse(courseId, studentId) {
        return this.service.findGradesByStudentAndCourse(studentId, courseId);
    }
    findOne(id, className, section, courseId, teacherId) {
        return this.service.findOne(id, className, section, courseId, teacherId);
    }
    async updateGrades(updateGradeListDto) {
        return this.service.updateMany(updateGradeListDto);
    }
    remove(className, section, courseId, teacherId) {
        return this.service.remove(className, section, courseId, teacherId);
    }
};
exports.GradeController = GradeController;
__decorate([
    (0, common_1.Post)('createGrade'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_grade_dto_1.CreateGradeListDto]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getStudentGrades'),
    __param(0, (0, common_1.Query)('class')),
    __param(1, (0, common_1.Query)('section')),
    __param(2, (0, common_1.Query)('courseId')),
    __param(3, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student-course'),
    __param(0, (0, common_1.Query)('courseId')),
    __param(1, (0, common_1.Query)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "findGradesByStudentAndCourse", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('class')),
    __param(2, (0, common_1.Query)('section')),
    __param(3, (0, common_1.Query)('courseId')),
    __param(4, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], GradeController.prototype, "updateGrades", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('class')),
    __param(1, (0, common_1.Query)('section')),
    __param(2, (0, common_1.Query)('courseId')),
    __param(3, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], GradeController.prototype, "remove", null);
exports.GradeController = GradeController = __decorate([
    (0, common_1.Controller)('grade'),
    __metadata("design:paramtypes", [grade_service_1.GradeService])
], GradeController);
//# sourceMappingURL=grade.controller.js.map