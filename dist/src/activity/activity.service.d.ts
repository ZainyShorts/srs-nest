import { Model } from 'mongoose';
import { Activity } from './schema/schema.activity';
import { CreateActivityDto } from './dto/create-activity.dto';
export declare class ActivityService {
    private activityModel;
    constructor(activityModel: Model<Activity>);
    create(createActivityDto: CreateActivityDto): Promise<Activity>;
    findAll(page?: number, limit?: number, title?: string, performBy?: string): Promise<{
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        currentLimit: number;
        data: Activity[];
    }>;
    findOne(id: string): Promise<Activity>;
    delete(id: string): Promise<Activity>;
}
