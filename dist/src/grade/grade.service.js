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
exports.GradeService = void 0;
const common_1 = require("@nestjs/common");
const schema_garde_1 = require("./schema/schema.garde");
const course_schema_1 = require("../course/schema/course.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let GradeService = class GradeService {
    constructor(GradeModel, CourseModel) {
        this.GradeModel = GradeModel;
        this.CourseModel = CourseModel;
    }
    async create(createDtos) {
        try {
            const exists = await this.GradeModel.findOne({
                class: createDtos[0].class,
                section: createDtos[0].section,
                courseId: createDtos[0].courseId,
            });
            if (exists) {
                throw new common_1.BadRequestException('Grade already exists');
            }
            const createdGrades = await this.GradeModel.insertMany(createDtos);
            return createdGrades;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to create grade(s)');
        }
    }
    async findAll(className, section, courseId, teacherId) {
        try {
            const filter = {};
            if (className)
                filter.class = className;
            if (section)
                filter.section = section;
            if (courseId)
                filter.courseId = courseId;
            if (teacherId)
                filter.teacherId = teacherId;
            return this.GradeModel.find(filter).populate(['studentId']).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve grades');
        }
    }
    async findGradesByStudentAndCourse(studentId, courseId) {
        try {
            const grade = await this.GradeModel.findOne({ studentId, courseId }).exec();
            const course = await this.CourseModel.findById(courseId).select('courseName').exec();
            const courseName = course?.courseName || 'Unknown';
            if (!grade) {
                throw new common_1.NotFoundException('Grade not found for given student and course');
            }
            return {
                studentId: grade.studentId,
                courseId: grade.courseId,
                teacherId: grade.teacherId,
                courseName,
                quiz: grade.quiz,
                midTerm: grade.midTerm,
                project: grade.project,
                finalTerm: grade.finalTerm,
                overAll: grade.overAll,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve grades by student and course');
        }
    }
    async findOne(id, className, section, courseId, teacherId) {
        try {
            const filter = { _id: id };
            if (className)
                filter.class = className;
            if (section)
                filter.section = section;
            if (courseId)
                filter.courseId = courseId;
            if (teacherId)
                filter.teacherId = teacherId;
            const grade = await this.GradeModel.findOne(filter)
                .populate(['teacherId', 'courseId', 'studentId'])
                .exec();
            if (!grade)
                throw new common_1.NotFoundException('Grade not found');
            return grade;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to retrieve grade');
        }
    }
    async updateMany(grades) {
        try {
            const updatedGrades = [];
            for (const grade of grades) {
                const { _id, ...updateData } = grade;
                const updated = await this.GradeModel.findByIdAndUpdate(_id, updateData, { new: true });
                if (updated) {
                    updatedGrades.push(updated);
                }
            }
            return updatedGrades;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update grades');
        }
    }
    async remove(className, section, courseId, teacherId) {
        try {
            const filter = {};
            if (className)
                filter.class = className;
            if (section)
                filter.section = section;
            if (courseId)
                filter.courseId = courseId;
            if (teacherId)
                filter.teacherId = teacherId;
            return this.GradeModel.deleteMany(filter).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete grades');
        }
    }
};
exports.GradeService = GradeService;
exports.GradeService = GradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_garde_1.Grade.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], GradeService);
//# sourceMappingURL=grade.service.js.map