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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_attendace_1 = require("./schema/schema.attendace");
let AttendanceService = class AttendanceService {
    constructor(attendanceModel) {
        this.attendanceModel = attendanceModel;
    }
    async markAttendance(createAttendanceDto) {
        try {
            const exists = await this.attendanceModel.findOne({
                teacherId: createAttendanceDto.teacherId,
                courseId: createAttendanceDto.courseId,
                class: createAttendanceDto.class,
                section: createAttendanceDto.section,
                date: createAttendanceDto.date,
            });
            if (exists) {
                throw new common_1.ConflictException('Attendance already marked for this date');
            }
            const attendance = new this.attendanceModel(createAttendanceDto);
            return await attendance.save();
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException(error);
            }
            console.error('Error marking attendance:', error);
            throw new common_1.InternalServerErrorException('Failed to mark attendance');
        }
    }
    async summarizeAttendanceByStatus(data) {
        try {
            const summary = {
                Present: { count: 0, students: [] },
                Absent: { count: 0, students: [] },
                Late: { count: 0, students: [] },
                Excused: { count: 0, students: [] },
            };
            for (const student of data) {
                const status = student.attendance;
                if (summary[status]) {
                    summary[status].count += 1;
                    summary[status].students.push(student.studentName);
                }
            }
            const total = data.length;
            const result = Object.entries(summary).map(([status, { count, students }]) => ({
                status,
                percentage: total ? Math.round((count / total) * 100) : 0,
                count,
                students,
            }));
            return result;
        }
        catch (error) {
            console.error('Error summarizing attendance:', error);
            throw new common_1.InternalServerErrorException('Could not summarize attendance');
        }
    }
    async getTeacherViewAttendance(courseId, room, section, date, teacherId) {
        try {
            if (!courseId || !room || !section || !date) {
                throw new common_1.BadRequestException('Missing required parameters');
            }
            const filters = {
                courseId,
                class: room,
                section,
                date,
            };
            if (teacherId) {
                filters.teacherId = teacherId;
            }
            console.log(filters);
            let result = await this.attendanceModel.findOne(filters).exec();
            if (result != null) {
                const attendanceReport = await this.summarizeAttendanceByStatus(result['students']);
                result = result.toObject();
                result['attendanceReport'] = attendanceReport;
            }
            return result;
        }
        catch (error) {
            console.error('Error in getTeacherViewAttendance:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve attendance');
        }
    }
    async findByStudent(studentId) {
        return this.attendanceModel
            .find({ studentId })
            .populate('teacherId courseId')
            .exec();
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_attendace_1.Attendance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map