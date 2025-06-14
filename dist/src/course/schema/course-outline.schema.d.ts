import { Document, Schema as MongooseSchema } from 'mongoose';
import { Teacher } from 'src/teacher/schema/schema.teacher';
export type CourseOutlineDocument = CourseOutline & Document;
export declare class CourseOutline {
    teacherId: Teacher;
    status: string;
    document: string;
    courseName: string;
    notes: string;
}
export declare const CourseOutlineSchema: MongooseSchema<CourseOutline, import("mongoose").Model<CourseOutline, any, any, any, Document<unknown, any, CourseOutline> & CourseOutline & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CourseOutline, Document<unknown, {}, import("mongoose").FlatRecord<CourseOutline>> & import("mongoose").FlatRecord<CourseOutline> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
