import { Document, Schema as MongooseSchema } from 'mongoose';
import { Student } from '../../student/schema/student.schema';
import { Course } from '../../course/schema/course.schema';
import { Teacher } from 'src/teacher/schema/schema.teacher';
export type GradeDocument = Grade & Document;
export declare class GradeComponent {
    score: number;
    weightage: number;
}
export declare class Grade {
    teacherId: Teacher;
    courseId: Course;
    studentId: Student;
    class: string;
    section: string;
    term: string;
    quiz: GradeComponent;
    midTerm: GradeComponent;
    project: GradeComponent;
    finalTerm: GradeComponent;
    overAll: number;
}
export declare const GradeSchema: MongooseSchema<Grade, import("mongoose").Model<Grade, any, any, any, Document<unknown, any, Grade> & Grade & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Grade, Document<unknown, {}, import("mongoose").FlatRecord<Grade>> & import("mongoose").FlatRecord<Grade> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
