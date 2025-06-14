import { Document, Schema as MongooseSchema } from 'mongoose';
import { Course } from 'src/course/schema/course.schema';
import { Teacher } from 'src/teacher/schema/schema.teacher';
export type ScheduleDocument = Schedule & Document;
declare class ScheduleDay {
    startTime: string;
    endTime: string;
    date: string;
}
export declare class Schedule {
    courseId: Course;
    className: string;
    section: string;
    note: string;
    teacherId: Teacher;
    dayOfWeek: ScheduleDay[];
}
export declare const ScheduleSchema: MongooseSchema<Schedule, import("mongoose").Model<Schedule, any, any, any, Document<unknown, any, Schedule> & Schedule & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Schedule, Document<unknown, {}, import("mongoose").FlatRecord<Schedule>> & import("mongoose").FlatRecord<Schedule> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
