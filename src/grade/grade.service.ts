import { Injectable } from '@nestjs/common';
import { Grade, GradeDocument } from './schema/schema.garde';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradeService {
  constructor(
    @InjectModel(Grade.name)
    private GradeModel: Model<GradeDocument>,
  ) {}

  async create(createDtos: CreateGradeDto[]): Promise<any> {
    const createdGrades = await this.GradeModel.insertMany(createDtos);
    return createdGrades;
  }

  async findAll(
    className?: string,
    section?: string,
    courseId?: string,
    teacherId?: string,
  ): Promise<Grade[]> {
    // Build filter object
    const filter: any = {};

    if (className) {
      filter.class = className;
    }

    if (section) {
      filter.section = section;
    }

    if (courseId) {
      filter.courseId = courseId;
    }

    if (teacherId) {
      filter.teacherId = teacherId;
    }

    // Query with populated fields and filters applied
    return this.GradeModel.find(filter).populate(['studentId']).exec();
  }

  async findOne(
    id: string,
    className?: string,
    section?: string,
    courseId?: string,
    teacherId?: string,
  ): Promise<Grade> {
    // Build filter object for additional parameters
    const filter: any = { _id: id };

    if (className) {
      filter.class = className;
    }

    if (section) {
      filter.section = section;
    }

    if (courseId) {
      filter.courseId = courseId;
    }

    if (teacherId) {
      filter.teacherId = teacherId;
    }

    // Query the database with the ID and filter applied
    return this.GradeModel.findOne(filter)
      .populate(['teacherId', 'courseId', 'studentId'])
      .exec();
  }

  async updateMany(grades: UpdateGradeDto[]): Promise<Grade[]> {
    const updatedGrades: Grade[] = [];

    for (const grade of grades) {
      const { _id, ...updateData } = grade;
      const updated = await this.GradeModel.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
      if (updated) {
        updatedGrades.push(updated);
      }
    }

    return updatedGrades;
  }

  async remove(
    className?: string,
    section?: string,
    courseId?: string,
    teacherId?: string,
  ): Promise<any> {
    const filter: any = {};

    if (className) {
      filter.class = className;
    }

    if (section) {
      filter.section = section;
    }

    if (courseId) {
      filter.courseId = courseId;
    }

    if (teacherId) {
      filter.teacherId = teacherId;
    }

    return this.GradeModel.deleteMany(filter).exec();
  }
}
