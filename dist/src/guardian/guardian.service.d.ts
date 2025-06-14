import { Model } from 'mongoose';
import { Guardian } from './schema/guardian.schema';
import { CreateGuardianDto } from './dto/create-guardian.dto';
export declare class GuardianService {
    private guardianModel;
    constructor(guardianModel: Model<Guardian>);
    create(createGuardianDto: CreateGuardianDto): Promise<Guardian>;
    findAll(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, Guardian> & Guardian & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        totalPages: number;
        totalRecordsCount: number;
        currentPage: number;
        limit: number;
    }>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, Guardian> & Guardian & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<Guardian>;
    delete(id: string): Promise<void>;
    update(id: string, updateGuardianDto: any): Promise<void>;
}
