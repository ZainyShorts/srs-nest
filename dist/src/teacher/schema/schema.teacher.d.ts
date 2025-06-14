import { Document } from 'mongoose';
export type TeacherDocument = Teacher & Document;
export declare class Teacher {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    password: string;
    assignedCourses: string[];
    department: string;
    address: string;
    qualification: string;
}
export declare const TeacherSchema: import("mongoose").Schema<Teacher, import("mongoose").Model<Teacher, any, any, any, Document<unknown, any, Teacher> & Teacher & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Teacher, Document<unknown, {}, import("mongoose").FlatRecord<Teacher>> & import("mongoose").FlatRecord<Teacher> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
