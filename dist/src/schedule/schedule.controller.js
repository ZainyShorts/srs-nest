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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const schedule_service_1 = require("./schedule.service");
const create_schedule_dto_1 = require("./dto/create-schedule.dto");
const update_schedule_dto_1 = require("./dto/update-schedule.dto");
let ScheduleController = class ScheduleController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    async create(createScheduleDto) {
        return this.scheduleService.create(createScheduleDto);
    }
    async findAll(page = 1, limit = 10, className, section, email, teacherId, date, courseId) {
        return this.scheduleService.findAll(+page, +limit, className, section, email, teacherId, date, courseId);
    }
    async getSchedulesByStudentAndDate(studentId, date) {
        return this.scheduleService.findSchedulesByStudentIdAndDate(studentId, date);
    }
    async findOne(id) {
        return this.scheduleService.findOne(id);
    }
    async getTotalStudentsAssignedToTeacher(id) {
        return this.scheduleService.getTotalStudentsAssignedToTeacher(id);
    }
    async update(id, updateScheduleDto) {
        return this.scheduleService.update(id, updateScheduleDto);
    }
    async remove(id) {
        return this.scheduleService.remove(id);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('class')),
    __param(3, (0, common_1.Query)('section')),
    __param(4, (0, common_1.Query)('email')),
    __param(5, (0, common_1.Query)('teacherId')),
    __param(6, (0, common_1.Query)('date')),
    __param(7, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-student'),
    __param(0, (0, common_1.Query)('studentId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getSchedulesByStudentAndDate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('getTotalStudentsAssignedToTeacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getTotalStudentsAssignedToTeacher", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_schedule_dto_1.UpdateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "remove", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, common_1.Controller)('schedule'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map