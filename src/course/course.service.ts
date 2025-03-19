import { ConflictException, Injectable, NotFoundException , BadRequestException , InternalServerErrorException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto'; 
import { isValidObjectId } from 'mongoose'; 


@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { courseName, courseCode, departmentId, ...rest } = createCourseDto;

    const existingCourseByName = await this.courseModel.findOne({ courseName }).exec();
    if (existingCourseByName) {
      throw new ConflictException('Course name already exists');
    }
  
    const existingCourseByCode = await this.courseModel.findOne({ courseCode }).exec();
    if (existingCourseByCode) { 
      throw new ConflictException('Course code already exists');
    }

    const newCourseData = { courseName, courseCode, ...rest };

    // Handle departmentId if provided
    if (departmentId) {
      if (!isValidObjectId(departmentId)) {
        throw new BadRequestException('Invalid departmentId format');
      }
      newCourseData['departmentId'] = departmentId;
    }

    try {
      const newCourse = new this.courseModel(newCourseData);
      return await newCourse.save();
    } catch (error) {
      console.error('Error creating course:', error);
      throw new InternalServerErrorException(
        'Failed to create course. Please try again later.',
      );
    }
  }
  async findAll(coursename?: string): Promise<Course[]> {
    const filter = coursename
        ? { courseName: { $regex: coursename, $options: "i" } }
        : {}; 
             
    return this.courseModel
        .find(filter)
        .populate('departmentId')
        .exec();
}



  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).populate('departmentId').exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }
  
  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    if (!updatedCourse) throw new NotFoundException('Course not found');
    return updatedCourse;
  }

  async remove(id: string): Promise<Course> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) throw new NotFoundException('Course not found');
    return deletedCourse;
  }
}
