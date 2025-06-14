import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
export declare class ClubController {
    private readonly clubService;
    constructor(clubService: ClubService);
    create(createClubDto: CreateClubDto): Promise<import("./schema/club.schema").Club>;
    findAll(): Promise<import("./schema/club.schema").Club[]>;
    findOne(id: string): Promise<import("./schema/club.schema").Club>;
    update(id: string, updateClubDto: UpdateClubDto): Promise<import("./schema/club.schema").Club>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
