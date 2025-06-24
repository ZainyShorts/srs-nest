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
const XLSX = require("xlsx");
const guardian_schema_1 = require("../guardian/schema/guardian.schema");
const schema_attendace_1 = require("../attendance/schema/schema.attendace");
const course_schema_1 = require("../course/schema/course.schema");
const mongoose_3 = require("@nestjs/mongoose");
let StudentService = class StudentService {
    constructor(studentModel, guardianService, guardianModel, attendanceModel, courseModel, connection) {
        this.studentModel = studentModel;
        this.guardianService = guardianService;
        this.guardianModel = guardianModel;
        this.attendanceModel = attendanceModel;
        this.courseModel = courseModel;
        this.connection = connection;
    }
    calculateGraduationDate(enrollDate) {
        const date = new Date(enrollDate);
        date.setFullYear(date.getFullYear() + 5);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    async bulkUpload(file) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const workbook = XLSX.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet);
            console.log(rows);
            const BATCH_SIZE = 100;
            let insertedCount = 0;
            let skippedCount = 0;
            for (let i = 0; i < rows.length; i += BATCH_SIZE) {
                const batch = rows.slice(i, i + BATCH_SIZE);
                const result = await this.processBatch(batch, session);
                insertedCount += result.insertedCount;
                skippedCount += result.skippedCount;
            }
            await session.commitTransaction();
            return { insertedCount, skippedCount };
        }
        catch (error) {
            await session.abortTransaction();
            throw new Error(`Bulk upload failed: ${error.message}`);
        }
        finally {
            session.endSession();
        }
    }
    async processBatch(rows, session) {
        let insertedCount = 0;
        let skippedCount = 0;
        const { validStudents, skipped } = await this.prepareStudentData(rows, session);
        skippedCount += skipped;
        if (validStudents.length === 0) {
            return { insertedCount, skippedCount };
        }
        const guardianData = validStudents.map((student) => ({
            guardianName: student.guardianName,
            guardianEmail: student.guardianEmail,
            guardianPhone: student.guardianPhone,
            guardianRelation: student.guardianRelation,
            guardianProfession: student.guardianProfession,
        }));
        const guardianIds = await this.upsertGuardians(guardianData, session);
        const studentsWithGuardians = validStudents.map((student, index) => ({
            studentId: student.studentId,
            firstName: student.firstName,
            lastName: student.lastName,
            class: student.class,
            section: student.section,
            gender: student.gender,
            dob: student.dob,
            email: student.email,
            phone: student.phone,
            address: student.address,
            emergencyContact: student.emergencyContact,
            enrollDate: student.enrollDate,
            expectedGraduation: student.expectedGraduation,
            guardian: guardianIds[index],
            profilePhoto: 'N/A',
            transcripts: [],
            iipFlag: false,
            honorRolls: false,
            athletics: false,
            clubs: '',
            lunch: '',
            nationality: '',
        }));
        await this.studentModel.insertMany(studentsWithGuardians, { session });
        insertedCount += studentsWithGuardians.length;
        return { insertedCount, skippedCount };
    }
    async prepareStudentData(rows, session) {
        const validStudents = [];
        let skippedCount = 0;
        const studentEmails = rows.map((row) => row.email).filter(Boolean);
        const guardianEmails = rows.map((row) => row.guardianEmail).filter(Boolean);
        const [existingStudents, existingGuardians] = await Promise.all([
            this.studentModel
                .find({ email: { $in: studentEmails } }, { email: 1 }, { session })
                .lean(),
            this.guardianModel
                .find({ guardianEmail: { $in: guardianEmails } }, { guardianEmail: 1 }, { session })
                .lean(),
        ]);
        const existingStudentEmails = new Set(existingStudents.map((s) => s.email));
        const existingGuardianEmails = new Set(existingGuardians.map((g) => g.guardianEmail));
        for (const row of rows) {
            if (existingStudentEmails.has(row.email)) {
                skippedCount++;
                continue;
            }
            if (existingGuardianEmails.has(row.guardianEmail)) {
                skippedCount++;
                continue;
            }
            if (row.email === row.guardianEmail) {
                skippedCount++;
                continue;
            }
            if (!row.email ||
                !row.guardianEmail ||
                !row.enrollDate ||
                !row.studentId) {
                skippedCount++;
                continue;
            }
            const studentDto = {
                studentId: row.studentId,
                firstName: row.firstName,
                lastName: row.lastName,
                class: row.Grade,
                section: row.Section,
                gender: row.Gender,
                dob: row.DOB,
                email: row.email,
                phone: row.phone,
                address: row.address,
                emergencyContact: row.emergencyContact,
                enrollDate: row.enrollDate,
                expectedGraduation: this.calculateGraduationDate(row.enrollDate),
                guardianName: row.guardianName,
                guardianEmail: row.guardianEmail,
                guardianPhone: row.guardianPhone,
                guardianRelation: row.guardianRelation,
                guardianProfession: row.guardianProfession,
            };
            validStudents.push(studentDto);
        }
        return { validStudents, skipped: skippedCount };
    }
    async upsertGuardians(guardians, session) {
        if (guardians.length === 0)
            return [];
        const bulkOps = guardians.map((guardian) => ({
            updateOne: {
                filter: { guardianEmail: guardian.guardianEmail },
                update: {
                    $setOnInsert: {
                        guardianName: guardian.guardianName,
                        guardianEmail: guardian.guardianEmail,
                        guardianPhone: guardian.guardianPhone,
                        guardianRelation: guardian.guardianRelation,
                        guardianProfession: guardian.guardianProfession,
                        guardianPhoto: 'N/A',
                        password: '$2b$10$1VlR8HWa.Pzyo96BdwL0H.3Hdp2WF9oRX1W9lEF4EohpCWbq70jKm',
                    },
                },
                upsert: true,
            },
        }));
        await this.guardianModel.bulkWrite(bulkOps, { session });
        const guardianEmails = guardians.map((g) => g.guardianEmail);
        const guardianDocs = await this.guardianModel
            .find({ guardianEmail: { $in: guardianEmails } }, { _id: 1, guardianEmail: 1 }, { session })
            .lean();
        const emailToIdMap = new Map(guardianDocs.map((g) => [g.guardianEmail, g._id]));
        return guardians.map((g) => emailToIdMap.get(g.guardianEmail));
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
            console.log('className', className);
            console.log('section', section);
            const count = await this.studentModel.countDocuments({
                class: className,
                section: section,
            });
            console.log('ount', count);
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
    __param(5, (0, mongoose_3.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        guardian_service_1.GuardianService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Connection])
], StudentService);
//# sourceMappingURL=student.service.js.map