import { Document, Schema as MongooseSchema } from 'mongoose';
import { Student } from '../../student/schema/student.schema';
import { Course } from '../../course/schema/course.schema';
import { Teacher } from 'src/teacher/schema/schema.teacher';
export type AttendanceDocument = Attendance & Document;
export declare class Attendance {
    teacherId: Teacher;
    courseId: Course;
    date: string;
    class: string;
    section: string;
    students: {
        studentId: Student;
        studentName: string;
        attendance: string;
        note?: string;
    }[];
}
export declare const AttendanceSchema: MongooseSchema<Attendance, import("mongoose").Model<Attendance, any, any, any, Document<unknown, any, Attendance> & Attendance & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Attendance, Document<unknown, {}, import("mongoose").FlatRecord<Attendance>> & import("mongoose").FlatRecord<Attendance> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
