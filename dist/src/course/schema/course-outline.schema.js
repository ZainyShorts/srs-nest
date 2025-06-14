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
exports.CourseOutlineSchema = exports.CourseOutline = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_teacher_1 = require("../../teacher/schema/schema.teacher");
const enum_1 = require("../../../utils/enum");
let CourseOutline = class CourseOutline {
};
exports.CourseOutline = CourseOutline;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    }),
    __metadata("design:type", schema_teacher_1.Teacher)
], CourseOutline.prototype, "teacherId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: enum_1.courseOutlineStatus,
        default: enum_1.courseOutlineStatus.Pending,
    }),
    __metadata("design:type", String)
], CourseOutline.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CourseOutline.prototype, "document", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CourseOutline.prototype, "courseName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], CourseOutline.prototype, "notes", void 0);
exports.CourseOutline = CourseOutline = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CourseOutline);
exports.CourseOutlineSchema = mongoose_1.SchemaFactory.createForClass(CourseOutline);
//# sourceMappingURL=course-outline.schema.js.map