import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schema/schedule.schema';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { StudentService } from 'src/student/student.service';
export declare class ScheduleService {
    private scheduleModel;
    private readonly studentService;
    constructor(scheduleModel: Model<ScheduleDocument>, studentService: StudentService);
    private isTimeOverlap;
    create(createScheduleDto: CreateScheduleDto): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(page: number, limit: number, className: string, section: string, email: string, teacherId?: string, date?: string, courseId?: boolean): Promise<{
        data: Schedule[];
        total: number;
    }>;
    findOne(id: string): Promise<Schedule>;
    capitalizeFirstLetter(text: any): any;
    findSchedulesByStudentIdAndDate(studentId: string, date: string): Promise<Schedule[]>;
    getTotalStudentsAssignedToTeacher(id: string): Promise<{
        success: boolean;
        totalStudents: number;
        todayClasses: number;
    }>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule>;
    remove(id: string): Promise<Schedule>;
}
