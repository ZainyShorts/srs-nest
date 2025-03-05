import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mongoId } from 'utils/deScopeIdForrmater';

@Injectable()
export class HistoryService {


    constructor(@InjectModel("History") private historyModel: Model<History>) {}

  async create(createHistoryInput: CreateHistoryDto): Promise<History> {
    const historyRecords = await this.historyModel.find({userId:createHistoryInput.userId,agentName:createHistoryInput.agentName}).countDocuments().exec()

    if (historyRecords >= 5) {
        // Find and delete the oldest record
        await this.historyModel
            .findOneAndDelete({ userId: mongoId(createHistoryInput.userId), agentName: createHistoryInput.agentName })
            .sort({ createdAt: 1 }) // Oldest first
            .exec();
    }

    console.log(mongoId(createHistoryInput.userId))
    const createdHistory = await this.historyModel.create({
        ...createHistoryInput,
        userId:mongoId(createHistoryInput.userId)
    });
    return createdHistory.save();
  }

  async findOne(id: string): Promise<History> {
    return this.historyModel.findById(id).exec();
  }

  async findAll(userId: string, agentName: string): Promise<History[]> {
    // Validate and convert userId to ObjectId
    const filter: any = {};
    
    if (userId) {
        filter.userId = mongoId(userId);
    } else if (userId) {
        throw new Error("Invalid userId format");
    }

    if (agentName) {
        filter.agentName = agentName;
    }

    console.log(await this.historyModel.find(filter).exec())

    return this.historyModel.find(filter).exec();
}

  async delete(id: string): Promise<boolean> {
    const result = await this.historyModel.findByIdAndDelete(id).exec();
    return result ? true : false;
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    const updatedHistory = await this.historyModel
        .findByIdAndUpdate(id, updateHistoryDto, { new: true })
        .exec();

    if (!updatedHistory) {
        throw new NotFoundException(`History record with ID ${id} not found`);
    }

    return updatedHistory;
}

}

export class CreateHistoryDto {
    userId: string;
    agentName: string;
    history: string;
    title: string;
  }

  import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateHistoryDto {
    @IsOptional()
    @IsString()
    agentName?: string;

    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;
}
