import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    create(createActivityDto: CreateActivityDto): Promise<import("./schema/schema.activity").Activity>;
    findAll(page?: number, limit?: number, title?: string, performBy?: string): Promise<{
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        currentLimit: number;
        data: import("./schema/schema.activity").Activity[];
    }>;
    findOne(id: string): Promise<import("./schema/schema.activity").Activity>;
    delete(id: string): Promise<import("./schema/schema.activity").Activity>;
}
