import { Model } from 'mongoose';
import { Club, ClubDocument } from './schema/club.schema';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
export declare class ClubService {
    private clubModel;
    constructor(clubModel: Model<ClubDocument>);
    create(createClubDto: CreateClubDto): Promise<Club>;
    findAll(): Promise<Club[]>;
    findOne(id: string): Promise<Club>;
    update(id: string, updateClubDto: UpdateClubDto): Promise<Club>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
