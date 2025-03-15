import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Teacher } from 'src/teacher/schema/schema.teacher';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true })
  courseCode: string;

  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  creditHours: number;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  instructor: Teacher;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
