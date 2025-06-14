import { Document, Schema as MongooseSchema } from 'mongoose';
import { Department } from 'src/department/schema/department.schema';
export type CourseDocument = Course & Document;
export declare class Course {
    courseCode: string;
    departmentId: Department;
    Prerequisites: string;
    courseName: string;
    description: string;
    courseCredit: number;
    active: boolean;
    assigned: boolean;
    special: boolean;
    duration: string;
}
export declare const CourseSchema: MongooseSchema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course> & Course & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
