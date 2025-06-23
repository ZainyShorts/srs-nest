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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("../course/schema/course.schema");
const schema_teacher_1 = require("./schema/schema.teacher");
const xlsx = require("xlsx");
const fs = require("fs");
const bcrypt = require("bcrypt");
const department_schema_1 = require("../department/schema/department.schema");
let TeacherService = class TeacherService {
    constructor(teacherModel, courseModel, departmentModel) {
        this.teacherModel = teacherModel;
        this.courseModel = courseModel;
        this.departmentModel = departmentModel;
    }
    async addTeacher(createTeacherDto) {
        const existingTeacher = await this.teacherModel.findOne({
            email: createTeacherDto.email,
        });
        if (existingTeacher) {
            return {
                status: common_1.HttpStatus.CONFLICT,
                msg: `Teacher with this ${createTeacherDto.email} already exists`,
            };
        }
        const newTeacher = new this.teacherModel(createTeacherDto);
        return newTeacher.save();
    }
    async updateTeacher(id, updateTeacherDto) {
        const existingTeacher = await this.teacherModel.findById(id);
        if (!existingTeacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, {
            new: true,
        });
    }
    async assignCourseToTeacher(teacherId, courseId) {
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (teacher.assignedCourses.includes(courseId)) {
            throw new common_1.NotFoundException('Course already assigned to this teacher');
        }
        const session = await this.teacherModel.db.startSession();
        session.startTransaction();
        try {
            const updatedTeacher = await this.teacherModel.findByIdAndUpdate(teacherId, { $addToSet: { assignedCourses: courseId } }, { new: true, session });
            const updatedCourse = await this.courseModel.findByIdAndUpdate(courseId, { assigned: true }, { new: true, session });
            await session.commitTransaction();
            await session.endSession();
            return { teacher: updatedTeacher, course: updatedCourse };
        }
        catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw new Error('Failed to assign course to teacher');
        }
    }
    async getAssignedCoursesForTeacher(teacherId) {
        const teacher = await this.teacherModel
            .findById(teacherId)
            .select('assignedCourses');
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const courses = await this.courseModel.find({
            _id: { $in: teacher.assignedCourses },
        });
        return courses;
    }
    async getUnassignedCoursesByTeacherId(teacherId) {
        const teacher = await this.teacherModel
            .findById(teacherId)
            .select('department');
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const department = await this.departmentModel.findOne({
            departmentName: teacher.department,
        });
        if (!department) {
            throw new common_1.NotFoundException('Department not found for name: ' + teacher.department);
        }
        const unassignedCourses = await this.courseModel.find({
            departmentId: department._id,
        });
        return unassignedCourses;
    }
    async removeCourseAssignment(teacherId, courseId) {
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher with ID ${teacherId} not found`);
        }
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        const courseIndex = teacher.assignedCourses.findIndex((id) => id.toString() === courseId);
        if (courseIndex === -1) {
            throw new common_1.BadRequestException(`Course ${courseId} is not assigned to teacher ${teacherId}`);
        }
        const session = await this.teacherModel.db.startSession();
        session.startTransaction();
        try {
            const updatedTeacher = await this.teacherModel.findByIdAndUpdate(teacherId, { $pull: { assignedCourses: courseId } }, { new: true, session });
            const updatedCourse = await this.courseModel.findByIdAndUpdate(courseId, { assigned: false }, { new: true, session });
            await session.commitTransaction();
            return { teacher: updatedTeacher, course: updatedCourse };
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.InternalServerErrorException('Failed to unassign course: ' + error.message);
        }
        finally {
            session.endSession();
        }
    }
    async delete(id) {
        const teacher = await this.teacherModel.findById(id);
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher with ID "${id}" not found.`);
        }
        await this.teacherModel.findByIdAndDelete(id);
        return { message: 'Teacher deleted successfully.' };
    }
    async findOne(id) {
        return this.teacherModel.findById(id, '-password -updatedAt');
    }
    async findAll(page = 1, limit = 10, startDate, endDate, department, email) {
        const skip = (page - 1) * limit;
        const filter = {};
        if (department) {
            filter.department = department;
        }
        if (email) {
            filter.email = email;
        }
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }
        const totalRecordsCount = await this.teacherModel.countDocuments(filter);
        const teachers = await this.teacherModel
            .find(filter, '-password -updatedAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        return {
            data: teachers,
            totalPages: Math.ceil(totalRecordsCount / limit),
            totalRecordsCount,
            currentPage: page,
            limit,
        };
    }
    async importStudents(filePath) {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const teachers = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (teachers.length > 1000) {
                return {
                    status: common_1.HttpStatus.CONFLICT,
                    msg: 'Limit exceeded: Maximum 1000 records allowed at a time.',
                };
            }
            const emails = teachers.map((s) => s.email);
            const existingStudents = await this.teacherModel.find({
                $or: [{ email: { $in: emails } }],
            });
            const existingTeachersByEmail = new Map(existingStudents.map((s) => [s.email, s]));
            const validTeachers = [];
            for (const [i, student] of teachers.entries()) {
                const { email } = student;
                const rowNumber = i + 2;
                if (existingTeachersByEmail.has(email)) {
                    const existingStudent = existingTeachersByEmail.get(email);
                    return {
                        status: common_1.HttpStatus.CONFLICT,
                        msg: `Row ${rowNumber}: Teacher email "${email}" is already registered with ${existingStudent.firstName} ${existingStudent.lastName}.`,
                    };
                }
                validTeachers.push(student);
            }
            if (validTeachers.length === 0) {
                return {
                    status: common_1.HttpStatus.CONFLICT,
                    msg: `No valid records to insert. All entries already exist.`,
                };
            }
            await this.teacherModel.insertMany(validTeachers);
            return {
                message: `${validTeachers.length} Teachers imported successfully.`,
            };
        }
        catch (error) {
            console.error('Error importing teachers:', error);
            if (error instanceof common_1.ConflictException) {
                return {
                    status: common_1.HttpStatus.CONFLICT,
                    msg: error.message,
                };
            }
            return {
                status: common_1.HttpStatus.CONFLICT,
                msg: error.message,
            };
        }
        finally {
            if (filePath) {
                fs.unlink(filePath, (err) => {
                    if (err)
                        console.error('Error deleting file:', err);
                });
            }
        }
    }
    async validateTeacher(data) {
        try {
            const teacher = await this.teacherModel.findOne({ email: data.email });
            if (!teacher)
                return null;
            const isMatch = await bcrypt.compare(data.password, teacher.password);
            console.log(teacher);
            return isMatch ? teacher : null;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_teacher_1.Teacher.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(2, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map