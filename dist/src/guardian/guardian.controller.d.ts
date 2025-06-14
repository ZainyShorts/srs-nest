import { GuardianService } from './guardian.service';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { Guardian } from './schema/guardian.schema';
export declare class GuardianController {
    private readonly guardianService;
    constructor(guardianService: GuardianService);
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
    findOne(id: string): Promise<Guardian>;
}
