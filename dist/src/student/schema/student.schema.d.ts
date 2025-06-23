import { Document } from 'mongoose';
import { Guardian } from '../../guardian/schema/guardian.schema';
export declare class Student extends Document {
    studentId: string;
    firstName: string;
    lastName: string;
    class: string;
    section: string;
    gender: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: string;
    enrollDate: string;
    expectedGraduation: string;
    password: string;
    guardian: Guardian;
    profilePhoto: string;
    transcripts: string[];
    iipFlag: boolean;
    honorRolls: boolean;
    athletics: boolean;
    clubs: string;
    lunch: string;
    nationality: string;
}
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, Document<unknown, any, Student> & Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, import("mongoose").FlatRecord<Student>> & import("mongoose").FlatRecord<Student> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
