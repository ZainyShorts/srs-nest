import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private readonly guardianService: GuardianService,
    @InjectModel(Guardian.name) private guardianModel: Model<Guardian>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { guardianName, guardianEmail, guardianPhone,guardianRelation,guardianPhoto,guardianProfession,rollNo, email, ...studentData } =
      createStudentDto;

    if(guardianEmail === email){
      throw new ConflictException(`The student's email cannot be the same as the guardian's email.`);
    }

    // Check if rollNo already exists
    const existingStudentByRollNo = await this.studentModel.findOne({ rollNo });
    if (existingStudentByRollNo) {
      console.log(existingStudentByRollNo)
      throw new ConflictException(`Roll number "${rollNo}" is already taken by student ${existingStudentByRollNo.firstName} ${existingStudentByRollNo.lastName}.`);
    }

    // Check if student email already exists
    const existingStudentByEmail = await this.studentModel.findOne({ email });
    if (existingStudentByEmail) {
      throw new ConflictException(`Student email "${email}" is already registered with ${existingStudentByEmail.firstName} ${existingStudentByEmail.lastName}.`);
    }

    // Check if guardian email already exists
    const existingGuardianByEmail = await this.guardianModel.findOne({guardianEmail});
    if (existingGuardianByEmail) {
      throw new ConflictException(`Guardian email "${guardianEmail}" is already registered`);
    }

    // Create Guardian First
    const guardian = await this.guardianService.create({
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianPhoto,
      guardianRelation,
      guardianProfession
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

  async findAll(
    page = 1,
    limit = 10,
    rollNo?: string,
    startDate?: string,
    endDate?: string,
    className?: string
  ) {
    const skip = (page - 1) * limit;
  
    // Define filter conditions
    const filter: any = {};
  
    if (rollNo) {
      filter.rollNo = rollNo; // Use direct match if rollNo is unique
    }
  
     console.log(className)
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
      .find(filter)
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
  
    const { guardianName, guardianEmail, guardianPhone,guardianRelation,guardianPhoto,guardianProfession,  ...studentData } = updateStudentDto;
  
    // Update Guardian details
    await this.guardianService.update(student.guardian.toString(), {
      guardianName,
      guardianEmail,
      guardianPhone,
      guardianRelation,
      guardianPhoto,
      guardianProfession
    });
  
    // Update Student details
    return this.studentModel.findByIdAndUpdate(id, studentData, { new: true }).populate('guardian');
  }



  // async importStudents(filePath: string): Promise<any> {
  //   try {
  //     // Read Excel file
  //     const workbook = xlsx.readFile(filePath);
  //     const sheetName = workbook.SheetNames[0];
  //     const students: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
  //     // Check max records limit
  //     if (students.length > 1000) {
  //       throw new BadRequestException('Limit exceeded: Maximum 1000 records allowed at a time.');
  //     }

  
  //     // Extract rollNo, email, and guardian.email for uniqueness check
  //     const rollNos = students.map((s) => s.rollNo);
  //     const emails = students.map((s) => s.email);
  //     const guardianEmails = students
  //       .filter((s) => s.guardianEmail)
  //       .map((s) => s.guardianEmail);

  //       console.log(rollNos)
  //       console.log(emails)
  //       console.log(guardianEmails)
  
  //     // Find existing students with matching rollNo, email, or guardian email
  //     const existingStudents = await this.studentModel.find({
  //       $or: [
  //         { rollNo: { $in: rollNos } },
  //         { email: { $in: emails } },
  //         { 'guardian.guardianEmail': { $in: guardianEmails } },
  //       ],
  //     });
  
  //     // Create a set of existing entries to filter new valid records
  //     const existingEntries = new Set(
  //       existingStudents.map((s) => `${s.rollNo}|${s.email}|${s.guardian?.guardianEmail}`)
  //     );
  
  //     // Process valid students with guardian handling
  //     const validStudents = [];
  //     for (const student of students) {
  //       if (existingEntries.has(`${student.rollNo}|${student.email}|${student.guardianEmail}`)) {
  //         continue; // Skip existing students
  //       }
  
  //       if (!student.guardianEmail) {
  //         throw new BadRequestException(`Guardian information is missing for student ${student.rollNo}`);
  //       }
  
  //       // Check if guardian already exists
  //       let guardian = await this.guardianModel.findOne({ guardianEmail: student.guardianEmail });
  
  //       // If guardian doesn't exist, create one
  //       if (!guardian) {
  //         guardian = await this.guardianModel.create({
  //           guardianName: student.guardianName,
  //           guardianEmail: student.guardianEmail,
  //           guardianPhone: student.guardianPhone,
  //           guardianRelation: student.guardianRelation,
  //           guardianProfession: student.guardianProfession,
  //           guardianPhoto: student.guardianPhoto,
  //         });
  //       }
  
  //       // Assign guardian ObjectId to student
  //       student.guardian = guardian._id;
  //       validStudents.push(student);
  //     }
  
  //     if (validStudents.length === 0) {
  //       throw new BadRequestException('No valid records to insert. All entries already exist.');
  //     }
  
  //     // Insert only valid students
  //     await this.studentModel.insertMany(validStudents);
  
  //     return { message: `${validStudents.length} students imported successfully.` };
  //   } catch (error) {
  //     console.error('Error importing students:', error);
  //     return { message: 'Uploading failed' };
  //   } finally {
  //     // Delete the uploaded file
  //     if (filePath) {
  //       fs.unlink(filePath, (err) => {
  //         if (err) console.error('Error deleting file:', err);
  //       });
  //     }
  //   }
  // }

  async importStudents(filePath: string): Promise<any> {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const students: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (students.length > 1000) {
            throw new BadRequestException('Limit exceeded: Maximum 1000 records allowed at a time.');
        }

        const rollNos = students.map((s) => s.rollNo);
        const emails = students.map((s) => s.email);
        const guardianEmails = students.filter((s) => s.guardianEmail).map((s) => s.guardianEmail);

        const existingStudents = await this.studentModel.find({
            $or: [{ rollNo: { $in: rollNos } }, { email: { $in: emails } }],
        });

        const existingGuardians = await this.guardianModel.find({
            guardianEmail: { $in: guardianEmails },
        });

        const existingStudentsByRollNo = new Map(existingStudents.map((s) => [s.rollNo, s]));
        const existingStudentsByEmail = new Map(existingStudents.map((s) => [s.email, s]));
        const existingGuardiansByEmail = new Map(existingGuardians.map((g) => [g.guardianEmail, g]));

        const validStudents = [];

        // ✅ Use `for...of` instead of `.forEach()` to properly handle async calls
        for (const [i, student] of students.entries()) {
            const { rollNo, email, guardianEmail } = student;
            const rowNumber = i + 2; // Adjusting for header row

            if (email === guardianEmail) {
                throw new ConflictException(`Row ${rowNumber}: Student email "${email}" cannot be the same as guardian email.`);
            }

            if (existingStudentsByRollNo.has(rollNo)) {
                const existingStudent = existingStudentsByRollNo.get(rollNo);
                throw new ConflictException(
                    `Row ${rowNumber}: Roll number "${rollNo}" is already taken by student ${existingStudent.firstName} ${existingStudent.lastName}.`
                );
            }

            if (existingStudentsByEmail.has(email)) {
                const existingStudent = existingStudentsByEmail.get(email);
                throw new ConflictException(
                    `Row ${rowNumber}: Student email "${email}" is already registered with ${existingStudent.firstName} ${existingStudent.lastName}.`
                );
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
            throw new BadRequestException('No valid records to insert. All entries already exist.');
        }

        await this.studentModel.insertMany(validStudents);

        return { message: `${validStudents.length} students imported successfully.` };
    } catch (error) {
        console.error('Error importing students:', error);

        // ✅ Ensure proper error handling
        if (error instanceof ConflictException) {
            throw new ConflictException(error.message); // Return proper 409 Conflict response
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
