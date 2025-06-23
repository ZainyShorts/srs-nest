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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./schema/course.schema");
const mongoose_3 = require("mongoose");
const schedule_schema_1 = require("../schedule/schema/schedule.schema");
let CourseService = class CourseService {
    constructor(courseModel, courseSchedule) {
        this.courseModel = courseModel;
        this.courseSchedule = courseSchedule;
    }
    async create(createCourseDto) {
        const { courseName, courseCode, departmentId, ...rest } = createCourseDto;
        const existingCourseByName = await this.courseModel
            .findOne({ courseName })
            .exec();
        if (existingCourseByName) {
            throw new common_1.ConflictException('Course name already exists');
        }
        const existingCourseByCode = await this.courseModel
            .findOne({ courseCode })
            .exec();
        if (existingCourseByCode) {
            throw new common_1.ConflictException('Course code already exists');
        }
        const newCourseData = { courseName, courseCode, ...rest };
        if (departmentId) {
            if (!(0, mongoose_3.isValidObjectId)(departmentId)) {
                throw new common_1.BadRequestException('Invalid departmentId format');
            }
            newCourseData['departmentId'] = departmentId;
        }
        try {
            const newCourse = new this.courseModel(newCourseData);
            return await newCourse.save();
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw new common_1.InternalServerErrorException('Failed to create course. Please try again later.');
        }
    }
    async findAll(coursename, active, special) {
        const filter = {};
        if (coursename) {
            filter.courseName = { $regex: coursename, $options: 'i' };
        }
        if (filter.active) {
            filter.active = active;
        }
        if (filter.special) {
            filter.special = special;
        }
        return this.courseModel.find(filter).populate('departmentId').exec();
    }
    async findOne(id) {
        const course = await this.courseModel
            .findById(id)
            .populate('departmentId')
            .exec();
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async update(id, updateCourseDto) {
        const existingCourse = await this.courseModel.findById(id).exec();
        if (!existingCourse) {
            throw new common_1.BadRequestException('Course not found');
        }
        if (updateCourseDto.courseName &&
            updateCourseDto.courseName !== existingCourse.courseName) {
            const existingCourseByName = await this.courseModel
                .findOne({ courseName: updateCourseDto.courseName })
                .exec();
            if (existingCourseByName) {
                throw new common_1.ConflictException('Course name already exists');
            }
        }
        const updatedCourse = await this.courseModel
            .findByIdAndUpdate(id, updateCourseDto, { new: true })
            .exec();
        return updatedCourse;
    }
    async remove(id) {
        const session = await this.courseModel.db.startSession();
        session.startTransaction();
        try {
            const deletedCourse = await this.courseModel.findByIdAndDelete(id, {
                session,
            });
            if (!deletedCourse) {
                throw new common_1.NotFoundException('Course not found');
            }
            await this.courseSchedule.deleteMany({ courseId: id }, { session });
            await session.commitTransaction();
            session.endSession();
            return deletedCourse;
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(schedule_schema_1.Schedule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CourseService);
//# sourceMappingURL=course.service.js.map