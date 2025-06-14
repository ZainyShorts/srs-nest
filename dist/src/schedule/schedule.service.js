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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_schema_1 = require("./schema/schedule.schema");
const student_service_1 = require("../student/student.service");
const moment = require("moment");
let ScheduleService = class ScheduleService {
    constructor(scheduleModel, studentService) {
        this.scheduleModel = scheduleModel;
        this.studentService = studentService;
    }
    async create(createScheduleDto) {
        const newSchedule = new this.scheduleModel(createScheduleDto);
        return newSchedule.save();
    }
    async findAll(page, limit, className, section, email, teacherId, date, courseId) {
        const skip = (page - 1) * limit;
        const filter = {};
        if (className)
            filter.className = className;
        if (section)
            filter.section = section;
        if (email)
            filter.email = email;
        if (teacherId)
            filter.teacherId = teacherId;
        if (date) {
            let dayToMatch = null;
            if (date === 'today') {
                dayToMatch = moment().format('dddd');
            }
            else if (date === 'tomorrow') {
                dayToMatch = moment().add(1, 'day').format('dddd');
            }
            else if (date === 'yesterday') {
                dayToMatch = moment().subtract(1, 'day').format('dddd');
            }
            if (dayToMatch) {
                filter['dayOfWeek.date'] = dayToMatch;
            }
        }
        const total = await this.scheduleModel.countDocuments({ filter });
        let data;
        if (courseId) {
            data = await this.scheduleModel
                .find(filter)
                .populate('courseId')
                .sort({ createdAt: -1 })
                .exec();
        }
        else {
            data = await this.scheduleModel
                .find(filter)
                .populate('teacherId')
                .populate('courseId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec();
        }
        return { data, total };
    }
    async findOne(id) {
        const schedule = await this.scheduleModel
            .findById(id)
            .populate('teacherId')
            .populate('couseId')
            .exec();
        if (!schedule) {
            throw new common_1.NotFoundException('Schedule not found');
        }
        return schedule;
    }
    async findSchedulesByStudentIdAndDate(studentId, date) {
        const student = await this.studentService.findById(studentId);
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const filter = {
            className: student.class,
            section: student.section,
        };
        let dayToMatch = null;
        if (date === 'today') {
            dayToMatch = moment().format('dddd');
        }
        else if (date === 'tomorrow') {
            dayToMatch = moment().add(1, 'day').format('dddd');
        }
        else if (date === 'yesterday') {
            dayToMatch = moment().subtract(1, 'day').format('dddd');
        }
        else {
            dayToMatch = date;
        }
        if (dayToMatch) {
            filter['dayOfWeek.date'] = dayToMatch;
        }
        return this.scheduleModel
            .find(filter)
            .populate('courseId')
            .populate('teacherId')
            .sort({ createdAt: -1 })
            .exec();
    }
    async getTotalStudentsAssignedToTeacher(id) {
        let totalStudents = 0;
        try {
            const scheduleClasses = await this.scheduleModel
                .find({ teacherId: id })
                .exec();
            for (const room of scheduleClasses) {
                const students = await this.studentService.studentCount(room.className, room.section);
                totalStudents += students;
            }
            const filter = { teacherId: id };
            let dayToMatch = null;
            dayToMatch = moment().format('dddd');
            if (dayToMatch) {
                filter['dayOfWeek.date'] = dayToMatch;
            }
            const todayClass = await this.scheduleModel.countDocuments(filter);
            console.log(todayClass);
            return {
                success: true,
                totalStudents,
                todayClasses: todayClass,
            };
        }
        catch (e) {
            console.log(e);
            return {
                success: false,
                totalStudents,
                todayClasses: 0,
            };
        }
    }
    async update(id, updateScheduleDto) {
        const updatedSchedule = await this.scheduleModel
            .findByIdAndUpdate(id, updateScheduleDto, { new: true })
            .exec();
        if (!updatedSchedule) {
            throw new common_1.NotFoundException('Schedule not found');
        }
        return updatedSchedule;
    }
    async remove(id) {
        const deletedSchedule = await this.scheduleModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedSchedule) {
            throw new common_1.NotFoundException('Schedule not found');
        }
        return deletedSchedule;
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schedule_schema_1.Schedule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        student_service_1.StudentService])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map