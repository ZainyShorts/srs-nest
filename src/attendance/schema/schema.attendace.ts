import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Student } from '../../student/schema/student.schema';
import { Course } from '../../course/schema/course.schema';
import { Teacher } from 'src/teacher/schema/schema.teacher';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Teacher', required: true })
  teacherId: Teacher;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  courseId: Course;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student', required: true })
  studentId: Student;

  @Prop({ required: true })
  date: string; // Example: "2024-03-15"

  @Prop({ required: true, enum: ['Present', 'Absent', 'Late'], default: 'Present' })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
