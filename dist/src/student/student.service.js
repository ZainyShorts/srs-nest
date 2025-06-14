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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const student_schema_1 = require("./schema/student.schema");
const guardian_service_1 = require("../guardian/guardian.service");
const xlsx = require("xlsx");
const fs = require("fs");
const guardian_schema_1 = require("../guardian/schema/guardian.schema");
const schema_attendace_1 = require("../attendance/schema/schema.attendace");
const course_schema_1 = require("../course/schema/course.schema");
let StudentService = class StudentService {
    constructor(studentModel, guardianService, guardianModel, attendanceModel, courseModel) {
        this.studentModel = studentModel;
        this.guardianService = guardianService;
        this.guardianModel = guardianModel;
        this.attendanceModel = attendanceModel;
        this.courseModel = courseModel;
    }
    async create(createStudentDto) {
        const { guardianName, guardianEmail, guardianPhone, guardianRelation, guardianPhoto, guardianProfession, studentId, email, ...studentData } = createStudentDto;
        if (guardianEmail === email) {
            return {
                status: common_1.HttpStatus.CONFLICT,
                msg: `The student's email cannot be the same as the guardian's email.`,
            };
        }
        const existingStudentBystudentId = await this.studentModel.findOne({
            studentId,
        });
        if (existingStudentBystudentId) {
            return {
                status: common_1.HttpStatus.CONFLICT,
                msg: `studentId number "${studentId}" is already taken by student ${existingStudentBystudentId.firstName} ${existingStudentBystudentId.lastName}.`,
            };
        }
        const existingStudentByEmail = await this.studentModel.findOne({ email });
        if (existingStudentByEmail) {
            return {
                status: common_1.HttpStatus.CONFLICT,
                msg: `Student email "${email}" is already registered with ${existingStudentByEmail.firstName} ${existingStudentByEmail.lastName}.`,
            };
        }
        const existingGuardianByEmail = await this.guardianModel.findOne({
            guardianEmail,
        });
        if (existingGuardianByEmail) {
            return {
                status: common_1.HttpStatus.CONFLICT,
                msg: `Guardian email "${guardianEmail}" is already registered`,
            };
        }
        const guardian = await this.guardianService.create({
            guardianName,
            guardianEmail,
            guardianPhone,
            guardianPhoto,
            guardianRelation,
            guardianProfession,
        });
        const hashedPassword = await bcrypt.hash('123', 10);
        const student = new this.studentModel({
            ...studentData,
            studentId,
            email,
            password: hashedPassword,
            guardian: guardian._id,
        });
        return student.save();
    }
    async findById(id) {
        return this.studentModel.findById(id).exec();
    }
    async findAll(page = 1, limit = 10, studentId, startDate, endDate, className) {
        const skip = (page - 1) * limit;
        const filter = {};
        if (studentId) {
            filter.studentId = studentId;
        }
        if (className) {
            filter.class = className;
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
        const totalRecordsCount = await this.studentModel.countDocuments(filter);
        const students = await this.studentModel
            .find(filter, '-password -updatedAt')
            .populate('guardian')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        return {
            data: students,
            totalPages: Math.ceil(totalRecordsCount / limit),
            totalRecordsCount,
            currentPage: page,
            limit,
        };
    }
    async studentCount(className, section) {
        try {
            const count = await this.studentModel.countDocuments({
                class: className,
                section: section,
            });
            return count;
        }
        catch (error) {
            console.error('Error fetching student count:', error);
            return 0;
        }
    }
    async findOne(id) {
        return this.studentModel
            .findById(id, '-password -updatedAt')
            .populate('guardian')
            .exec();
    }
    async delete(id) {
        const student = await this.studentModel
            .findById(id)
            .populate('guardian')
            .exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID "${id}" not found.`);
        }
        await this.guardianService.delete(student.guardian._id.toString());
        await this.studentModel.findByIdAndDelete(id);
        return { message: 'Student and associated guardian deleted successfully.' };
    }
    async update(id, updateStudentDto) {
        const student = await this.studentModel.findById(id);
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID "${id}" not found.`);
        }
        const { guardianName, guardianEmail, guardianPhone, guardianRelation, guardianPhoto, guardianProfession, ...studentData } = updateStudentDto;
        await this.guardianService.update(student.guardian.toString(), {
            guardianName,
            guardianEmail,
            guardianPhone,
            guardianRelation,
            guardianPhoto,
            guardianProfession,
        });
        return this.studentModel
            .findByIdAndUpdate(id, studentData, { new: true })
            .populate('guardian');
    }
    async importStudents(filePath) {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const students = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (students.length > 1000) {
                throw new common_1.BadRequestException('Limit exceeded: Maximum 1000 records allowed at a time.');
            }
            const studentIds = students.map((s) => s.studentId);
            const emails = students.map((s) => s.email);
            const guardianEmails = students
                .filter((s) => s.guardianEmail)
                .map((s) => s.guardianEmail);
            const existingStudents = await this.studentModel.find({
                $or: [{ studentId: { $in: studentIds } }, { email: { $in: emails } }],
            });
            const existingGuardians = await this.guardianModel.find({
                guardianEmail: { $in: guardianEmails },
            });
            const existingStudentsBystudentId = new Map(existingStudents.map((s) => [s.studentId, s]));
            const existingStudentsByEmail = new Map(existingStudents.map((s) => [s.email, s]));
            const existingGuardiansByEmail = new Map(existingGuardians.map((g) => [g.guardianEmail, g]));
            const validStudents = [];
            for (const [i, student] of students.entries()) {
                const { studentId, email, guardianEmail } = student;
                const rowNumber = i + 2;
                if (email === guardianEmail) {
                    return {
                        status: common_1.HttpStatus.CONFLICT,
                        msg: `Row ${rowNumber}: Student email "${email}" cannot be the same as guardian email.`,
                    };
                }
                if (existingStudentsBystudentId.has(studentId)) {
                    const existingStudent = existingStudentsBystudentId.get(studentId);
                    return {
                        status: common_1.HttpStatus.CONFLICT,
                        msg: `Row ${rowNumber}: Roll number "${studentId}" is already taken by student ${existingStudent.firstName} ${existingStudent.lastName}.`,
                    };
                }
                if (existingStudentsByEmail.has(email)) {
                    const existingStudent = existingStudentsByEmail.get(email);
                    return {
                        status: common_1.HttpStatus.CONFLICT,
                        msg: `Row ${rowNumber}: Student email "${email}" is already registered with ${existingStudent.firstName} ${existingStudent.lastName}.`,
                    };
                }
                let guardian;
                if (existingGuardiansByEmail.has(guardianEmail)) {
                    guardian = existingGuardiansByEmail.get(guardianEmail);
                }
                else {
                    guardian = await this.guardianModel.create({
                        guardianName: student.guardianName,
                        guardianEmail: student.guardianEmail,
                        guardianPhone: student.guardianPhone,
                        guardianRelation: student.guardianRelation,
                        guardianProfession: student.guardianProfession,
                        guardianPhoto: student.guardianPhoto,
                    });
                    existingGuardiansByEmail.set(guardianEmail, guardian);
                }
                student.guardian = guardian._id;
                validStudents.push(student);
            }
            if (validStudents.length === 0) {
                throw new common_1.BadRequestException('No valid records to insert. All entries already exist.');
            }
            await this.studentModel.insertMany(validStudents);
            return {
                message: `${validStudents.length} students imported successfully.`,
            };
        }
        catch (error) {
            console.error('Error importing students:', error);
            if (error instanceof common_1.ConflictException) {
                return {
                    status: common_1.HttpStatus.CONFLICT,
                    msg: error.message,
                };
            }
            throw new common_1.BadRequestException(error.message);
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
    async getAttendanceByStudentId(studentObjectId) {
        const objectId = new mongoose_2.Types.ObjectId(studentObjectId);
        const records = await this.attendanceModel
            .find({ 'students._id': objectId })
            .select('courseId students')
            .populate('courseId', 'courseName courseCode');
        const attendanceByCourse = {};
        records.forEach((record) => {
            const courseId = record.courseId._id.toString();
            const courseName = record.courseId.courseName;
            const studentEntry = record.students.find((s) => new mongoose_2.Types.ObjectId(s._id).equals(objectId));
            if (!studentEntry)
                return;
            if (!attendanceByCourse[courseId]) {
                attendanceByCourse[courseId] = {
                    present: 0,
                    total: 0,
                    name: courseName,
                };
            }
            if (studentEntry.attendance === 'Present') {
                attendanceByCourse[courseId].present += 1;
            }
            attendanceByCourse[courseId].total += 1;
        });
        const result = Object.entries(attendanceByCourse).map(([courseId, stats]) => ({
            courseId,
            courseName: stats.name,
            attendancePercentage: Math.round((stats.present / stats.total) * 100),
        }));
        return result;
    }
    async getStudentAttendanceByCourseCode(courseCode, studentId) {
        console.log(courseCode);
        console.log(studentId);
        const courseId = new mongoose_2.Types.ObjectId(courseCode);
        const course = await this.courseModel.findOne({ _id: courseCode });
        console.log(courseCode, 'is course id ka aaginst ya course aia ha ', course);
        if (!course) {
            throw new common_1.NotFoundException(`Course with code ${courseCode} not found`);
        }
        const attendanceRecords = await this.attendanceModel
            .find({
            courseId: course._id,
            'students._id': studentId,
        })
            .select('date students');
        const attendanceData = attendanceRecords.map((record) => {
            const student = record.students.find((s) => new mongoose_2.Types.ObjectId(s._id).equals(studentId));
            return {
                date: record.date,
                status: student?.attendance || 'N/A',
            };
        });
        return [{ courseCode: course.courseCode }, ...attendanceData];
    }
    async validateStudent(data) {
        try {
            const student = await this.studentModel.findOne({ email: data.email });
            if (!student)
                return null;
            const isMatch = await bcrypt.compare(data.password, student.password);
            return isMatch ? student : null;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(2, (0, mongoose_1.InjectModel)(guardian_schema_1.Guardian.name)),
    __param(3, (0, mongoose_1.InjectModel)(schema_attendace_1.Attendance.name)),
    __param(4, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        guardian_service_1.GuardianService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StudentService);
//# sourceMappingURL=student.service.js.map