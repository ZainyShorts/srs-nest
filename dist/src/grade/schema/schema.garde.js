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
exports.GradeSchema = exports.Grade = exports.GradeComponent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_schema_1 = require("../../student/schema/student.schema");
const course_schema_1 = require("../../course/schema/course.schema");
const schema_teacher_1 = require("../../teacher/schema/schema.teacher");
class GradeComponent {
}
exports.GradeComponent = GradeComponent;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GradeComponent.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GradeComponent.prototype, "weightage", void 0);
let Grade = class Grade {
};
exports.Grade = Grade;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Teacher', required: true }),
    __metadata("design:type", schema_teacher_1.Teacher)
], Grade.prototype, "teacherId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Course', required: true }),
    __metadata("design:type", course_schema_1.Course)
], Grade.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Student', required: true }),
    __metadata("design:type", student_schema_1.Student)
], Grade.prototype, "studentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Grade.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Grade.prototype, "section", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: GradeComponent, required: true }),
    __metadata("design:type", GradeComponent)
], Grade.prototype, "quiz", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: GradeComponent, required: true }),
    __metadata("design:type", GradeComponent)
], Grade.prototype, "midTerm", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: GradeComponent, required: true }),
    __metadata("design:type", GradeComponent)
], Grade.prototype, "project", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: GradeComponent, required: true }),
    __metadata("design:type", GradeComponent)
], Grade.prototype, "finalTerm", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Grade.prototype, "overAll", void 0);
exports.Grade = Grade = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Grade);
exports.GradeSchema = mongoose_1.SchemaFactory.createForClass(Grade);
//# sourceMappingURL=schema.garde.js.map