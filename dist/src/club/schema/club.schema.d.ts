import { Document } from 'mongoose';
export type ClubDocument = Club & Document;
export declare class Club {
    clubName: string;
    prerequisites: string;
}
export declare const ClubSchema: import("mongoose").Schema<Club, import("mongoose").Model<Club, any, any, any, Document<unknown, any, Club> & Club & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Club, Document<unknown, {}, import("mongoose").FlatRecord<Club>> & import("mongoose").FlatRecord<Club> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
