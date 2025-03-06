import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Student } from './schema/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { GuardianService } from '../guardian/guardian.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private readonly guardianService: GuardianService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { guardianName, guardianEmail, guardianPhone,relation,guardianPhoto,profession,rollNo, email, ...studentData } =
      createStudentDto;

    // Check if rollNo already exists
    const existingStudentByRollNo = await this.studentModel.findOne({ rollNo });
    if (existingStudentByRollNo) {
      throw new ConflictException(`Roll number "${rollNo}" is already taken.`);
    }

    // Check if student email already exists
    const existingStudentByEmail = await this.studentModel.findOne({ email });
    if (existingStudentByEmail) {
      throw new ConflictException(`Student email "${email}" is already registered.`);
    }

    // Check if guardian email already exists
    const existingGuardianByEmail = await this.guardianService.findByEmail(guardianEmail);
    if (existingGuardianByEmail) {
      throw new ConflictException(`Guardian email "${guardianEmail}" is already registered.`);
    }

    // Create Guardian First
    const guardian = await this.guardianService.create({
      name: guardianName,
      email: guardianEmail,
      phone: guardianPhone,
      guardianPhoto:guardianPhoto,
      relation:relation,
      profession:profession
    });

    // Hash password (default: 123)
    const hashedPassword = await bcrypt.hash('123', 10);

    // Create Student with Guardian ID
    const student = new this.studentModel({
      ...studentData,
      rollNo,
      email,
      password: hashedPassword,
      guardian: guardian._id,
    });

    return student.save();
  }

  async findAll(page = 1, limit = 10, rollNo?: string) {
    const skip = (page - 1) * limit;
  
    // Define filter condition with regex for rollNo
    const filter = rollNo ? { rollNo: { $regex: rollNo, $options: 'i' } } : {};
  
    const totalRecordsCount = await this.studentModel.countDocuments(filter);
    const students = await this.studentModel
      .find(filter)
      .populate('guardian')
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
  
  

  async findOne(id: string): Promise<Student> {
    return this.studentModel.findById(id).populate('guardian').exec();
  }

  async delete(id: string): Promise<{ message: string }> {
    const student = await this.studentModel.findById(id).populate("guardian").exec();
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found.`);
    }

  
    // Delete the associated guardian
    await this.guardianService.delete(student.guardian._id.toString());
  
    // Delete the student
    await this.studentModel.findByIdAndDelete(id);
  
    return { message: 'Student and associated guardian deleted successfully.' };
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found.`);
    }
  
    const { guardianName, guardianEmail, guardianPhone,relation,guardianPhoto,profession,  ...studentData } = updateStudentDto;
  
    // Update Guardian details
    await this.guardianService.update(student.guardian.toString(), {
      name: guardianName,
      email: guardianEmail,
      phone: guardianPhone,
      relation:relation,
      guardianPhoto:guardianPhoto,
      profession:profession
    });
  
    // Update Student details
    return this.studentModel.findByIdAndUpdate(id, studentData, { new: true }).populate('guardian');
  }
  
  
}
