import { Document } from 'mongoose';
export declare class Guardian extends Document {
    guardianName: string;
    guardianEmail: string;
    password: string;
    guardianPhone: string;
    guardianRelation: string;
    guardianProfession: string;
    guardianPhoto: string;
}
export declare const GuardianSchema: import("mongoose").Schema<Guardian, import("mongoose").Model<Guardian, any, any, any, Document<unknown, any, Guardian> & Guardian & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Guardian, Document<unknown, {}, import("mongoose").FlatRecord<Guardian>> & import("mongoose").FlatRecord<Guardian> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
