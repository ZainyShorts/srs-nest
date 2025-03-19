import { Injectable, ConflictException, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './schema/schema.teacher';
import { UpdateTeacherDto } from './dto/update-teaacher.dto';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class TeacherService {
  constructor(@InjectModel(Teacher.name) private teacherModel: Model<Teacher>) {}

  async addTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher | ResponseDto> {
    const existingTeacher = await this.teacherModel.findOne({ email: createTeacherDto.email });

    if (existingTeacher) {
      return {
        status:HttpStatus.CONFLICT,
        msg:"Email already exists",
      }
    }

    const newTeacher = new this.teacherModel(createTeacherDto);
    return newTeacher.save();
  }

  async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const existingTeacher = await this.teacherModel.findById(id);
    if (!existingTeacher) {
      throw new NotFoundException('Teacher not found');
    }

    // No need now --
    // Check if email is being updated and already exists
    // if (updateTeacherDto.email && updateTeacherDto.email !== existingTeacher.email) {
    //   const emailExists = await this.teacherModel.findOne({ email: updateTeacherDto.email });
    //   if (emailExists) {
    //     throw new ConflictException('Email already exists');
    //   }
    // }

    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true });
  }

  async delete(id: string): Promise<{ message: string }> {
    const teacher = await this.teacherModel.findById(id)
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID "${id}" not found.`);
    }
  
    // Delete the student
    await this.teacherModel.findByIdAndDelete(id);
  
    return { message: 'Teacher deleted successfully.' };
  }

  async findOne(id: string): Promise<Teacher> {
    return this.teacherModel.findById(id)
  }

  async findAll(
    page = 1,
    limit = 10,
    startDate?: string,
    endDate?: string,
    department?: string,
    email?:string
  ) {
    const skip = (page - 1) * limit;
  
    // Define filter conditions
    const filter: any = {};
  
   
  
    if (department) {
      filter.department = department; // Fixed class filtering
    }

    if (email) {
      filter.email = email; // Fixed class filtering
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
  
    const totalRecordsCount = await this.teacherModel.countDocuments(filter);
    const teachers = await this.teacherModel
      .find(filter)
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

  async importStudents(filePath: string): Promise<any> {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const teachers: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (teachers.length > 1000) {
          return {
            status:HttpStatus.CONFLICT,
            msg:"Limit exceeded: Maximum 1000 records allowed at a time.",
          }
        }

        const emails = teachers.map((s) => s.email);

        const existingStudents = await this.teacherModel.find({
            $or: [{ email: { $in: emails } }],
        });

        const existingTeachersByEmail = new Map(existingStudents.map((s) => [s.email, s]));

        const validTeachers = [];

        // ✅ Use `for...of` instead of `.forEach()` to properly handle async calls
        for (const [i, student] of teachers.entries()) {
            const { email } = student;
            const rowNumber = i + 2; // Adjusting for header row

            if (existingTeachersByEmail.has(email)) {
                const existingStudent = existingTeachersByEmail.get(email);
                return {
                  status:HttpStatus.CONFLICT,
                  msg:`Row ${rowNumber}: Teacher email "${email}" is already registered with ${existingStudent.firstName} ${existingStudent.lastName}.`,
                }
            }

            validTeachers.push(student);
        }

        if (validTeachers.length === 0) {
          return {
            status:HttpStatus.CONFLICT,
            msg:`No valid records to insert. All entries already exist.`,
          }
        }

        await this.teacherModel.insertMany(validTeachers);

        return { message: `${validTeachers.length} Teachers imported successfully.` };
    } catch (error) {
        console.error('Error importing teachers:', error);

        // ✅ Ensure proper error handling
        if (error instanceof ConflictException) {
            return {
              status:HttpStatus.CONFLICT,
              msg:error.message,
            }
        }

        return {
          status:HttpStatus.CONFLICT,
          msg:error.message,
        }
    } finally {
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
    }
}
}
