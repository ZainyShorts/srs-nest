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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSchema = exports.Schedule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("../../course/schema/course.schema");
const schema_teacher_1 = require("../../teacher/schema/schema.teacher");
class ScheduleDay {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduleDay.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduleDay.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduleDay.prototype, "date", void 0);
let Schedule = class Schedule {
};
exports.Schedule = Schedule;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", course_schema_1.Course)
], Schedule.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Schedule.prototype, "className", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Schedule.prototype, "section", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Schedule.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Teacher', required: true }),
    __metadata("design:type", schema_teacher_1.Teacher)
], Schedule.prototype, "teacherId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ScheduleDay], required: true }),
    __metadata("design:type", Array)
], Schedule.prototype, "dayOfWeek", void 0);
exports.Schedule = Schedule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Schedule);
exports.ScheduleSchema = mongoose_1.SchemaFactory.createForClass(Schedule);
//# sourceMappingURL=schedule.schema.js.map