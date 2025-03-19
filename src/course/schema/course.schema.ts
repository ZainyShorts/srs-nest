import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema  } from 'mongoose';
import { Department } from 'src/department/schema/department.schema';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true })
  courseCode: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Department', required: true })
  departmentId: Department;

  @Prop({ required: false })
  Prerequisites: string;

  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  description: string;

}

export const CourseSchema = SchemaFactory.createForClass(Course);
