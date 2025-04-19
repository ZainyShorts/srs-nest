import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Student } from './schema/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { GuardianService } from '../guardian/guardian.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { Guardian } from '../guardian/schema/guardian.schema';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private readonly guardianService: GuardianService,
    @InjectModel(Guardian.name) private guardianModel: Model<Guardian>,
  ) {}

  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<Student | ResponseDto> {
    const {
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianRelation,
      guardianPhoto,
      guardianProfession,
      studentId,
      email,
      ...studentData
    } = createStudentDto;

    if (guardianEmail === email) {
      return {
        status: HttpStatus.CONFLICT,
        msg: `The student's email cannot be the same as the guardian's email.`,
      };
    }

    // Check if studentId already exists
    const existingStudentBystudentId = await this.studentModel.findOne({
      studentId,
    });
    if (existingStudentBystudentId) {
      return {
        status: HttpStatus.CONFLICT,
        msg: `studentId number "${studentId}" is already taken by student ${existingStudentBystudentId.firstName} ${existingStudentBystudentId.lastName}.`,
      };
    }

    // Check if student email already exists
    const existingStudentByEmail = await this.studentModel.findOne({ email });
    if (existingStudentByEmail) {
      return {
        status: HttpStatus.CONFLICT,
        msg: `Student email "${email}" is already registered with ${existingStudentByEmail.firstName} ${existingStudentByEmail.lastName}.`,
      };
    }

    // Check if guardian email already exists
    const existingGuardianByEmail = await this.guardianModel.findOne({
      guardianEmail,
    });
    if (existingGuardianByEmail) {
      return {
        status: HttpStatus.CONFLICT,
        msg: `Guardian email "${guardianEmail}" is already registered`,
      };
    }

    // Create Guardian First
    const guardian = await this.guardianService.create({
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianPhoto,
      guardianRelation,
      guardianProfession,
    });

    // Hash password (default: 123)
    const hashedPassword = await bcrypt.hash('123', 10);

    // Create Student with Guardian ID
    const student = new this.studentModel({
      ...studentData,
      studentId,
      email,
      password: hashedPassword,
      guardian: guardian._id,
    });

    return student.save();
  }

  async findAll(
    page = 1,
    limit = 10,
    studentId?: string,
    startDate?: string,
    endDate?: string,
    className?: string,
  ) {
    const skip = (page - 1) * limit;

    // Define filter conditions
    const filter: any = {};

    if (studentId) {
      filter.studentId = studentId; // Use direct match if studentId is unique
    }

    if (className) {
      filter.class = className; // Fixed class filtering
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate); // Greater than or equal to start date
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate); // Less than or equal to end date
      }
    }

    const totalRecordsCount = await this.studentModel.countDocuments(filter);
    const students = await this.studentModel
      .find(filter, '-password -updatedAt') // Exclude password and updatedAt fields
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

  async studentCount(className: string, section: string) {
    try {
      const count = await this.studentModel.countDocuments({
        class: className,
        section: section,
      });
      return count;
    } catch (error) {
      console.error('Error fetching student count:', error);
      return 0; // or throw error if you want the caller to handle it
    }
  }

  async findOne(id: string): Promise<Student> {
    return this.studentModel
      .findById(id, '-password -updatedAt') // Exclude password and updatedAt fields
      .populate('guardian')
      .exec();
  }

  async delete(id: string): Promise<{ message: string }> {
    const student = await this.studentModel
      .findById(id)
      .populate('guardian')
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found.`);
    }

    // Delete the associated guardian
    await this.guardianService.delete(student.guardian._id.toString());

    // Delete the student
    await this.studentModel.findByIdAndDelete(id);

    return { message: 'Student and associated guardian deleted successfully.' };
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | ResponseDto> {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found.`);
    }

    const {
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianRelation,
      guardianPhoto,
      guardianProfession,
      ...studentData
    } = updateStudentDto;

    // Update Guardian details
    await this.guardianService.update(student.guardian.toString(), {
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianRelation,
      guardianPhoto,
      guardianProfession,
    });

    // Update Student details
    return this.studentModel
      .findByIdAndUpdate(id, studentData, { new: true })
      .populate('guardian');
  }

  async importStudents(filePath: string): Promise<any> {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const students: any[] = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheetName],
      );

      if (students.length > 1000) {
        throw new BadRequestException(
          'Limit exceeded: Maximum 1000 records allowed at a time.',
        );
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

      const existingStudentsBystudentId = new Map(
        existingStudents.map((s) => [s.studentId, s]),
      );
      const existingStudentsByEmail = new Map(
        existingStudents.map((s) => [s.email, s]),
      );
      const existingGuardiansByEmail = new Map(
        existingGuardians.map((g) => [g.guardianEmail, g]),
      );

      const validStudents = [];

      // ✅ Use `for...of` instead of `.forEach()` to properly handle async calls
      for (const [i, student] of students.entries()) {
        const { studentId, email, guardianEmail } = student;
        const rowNumber = i + 2; // Adjusting for header row

        if (email === guardianEmail) {
          return {
            status: HttpStatus.CONFLICT,
            msg: `Row ${rowNumber}: Student email "${email}" cannot be the same as guardian email.`,
          };
        }

        if (existingStudentsBystudentId.has(studentId)) {
          const existingStudent = existingStudentsBystudentId.get(studentId);
          return {
            status: HttpStatus.CONFLICT,
            msg: `Row ${rowNumber}: Roll number "${studentId}" is already taken by student ${existingStudent.firstName} ${existingStudent.lastName}.`,
          };
        }

        if (existingStudentsByEmail.has(email)) {
          const existingStudent = existingStudentsByEmail.get(email);
          return {
            status: HttpStatus.CONFLICT,
            msg: `Row ${rowNumber}: Student email "${email}" is already registered with ${existingStudent.firstName} ${existingStudent.lastName}.`,
          };
        }

        let guardian;
        if (existingGuardiansByEmail.has(guardianEmail)) {
          guardian = existingGuardiansByEmail.get(guardianEmail);
        } else {
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
        throw new BadRequestException(
          'No valid records to insert. All entries already exist.',
        );
      }

      await this.studentModel.insertMany(validStudents);

      return {
        message: `${validStudents.length} students imported successfully.`,
      };
    } catch (error) {
      console.error('Error importing students:', error);

      // ✅ Ensure proper error handling
      if (error instanceof ConflictException) {
        return {
          status: HttpStatus.CONFLICT,
          msg: error.message,
        };
      }

      throw new BadRequestException(error.message); // Return proper 400 Bad Request response
    } finally {
      if (filePath) {
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    }
  }
}
