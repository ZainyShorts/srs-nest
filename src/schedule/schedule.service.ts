import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schema/schedule.schema';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const newSchedule = new this.scheduleModel(createScheduleDto);
    return newSchedule.save();
  }

  async findAll(page: number, limit: number , className : string , section : string , email: string ): Promise<{ data: Schedule[], total: number }> {
    const skip = (page - 1) * limit; 
    const filter: any = {}; 
    if (className) { 
      filter.className = className
    } 
    if (email) { 
      filter.email = email
    } 
    if (section) { 
      filter.section = section
    } 
    // console.log('filters',filter)
    const total = await this.scheduleModel.countDocuments({filter});
    const data = await this.scheduleModel
      .find(filter)
      .populate('teacherId')
      .populate('courseId').sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .exec();
  
    return { data, total };
  }
  
  async findOne(id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(id).populate('teacherId').populate('couseId').exec();
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    return schedule;
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const updatedSchedule = await this.scheduleModel
      .findByIdAndUpdate(id, updateScheduleDto, { new: true })
      .exec();
    if (!updatedSchedule) {
      throw new NotFoundException('Schedule not found');
    }
    return updatedSchedule;
  }

  async remove(id: string): Promise<Schedule> {
    const deletedSchedule = await this.scheduleModel.findByIdAndDelete(id).exec();
    if (!deletedSchedule) {
      throw new NotFoundException('Schedule not found');
    }
    return deletedSchedule;
  }
}
