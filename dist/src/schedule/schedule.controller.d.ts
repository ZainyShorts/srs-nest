import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    create(createScheduleDto: CreateScheduleDto): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(page?: number, limit?: number, className?: string, section?: string, email?: string, teacherId?: string, date?: string, courseId?: boolean): Promise<{
        data: import("./schema/schedule.schema").Schedule[];
        total: number;
    }>;
    getSchedulesByStudentAndDate(studentId: string, date: string): Promise<import("./schema/schedule.schema").Schedule[]>;
    findOne(id: string): Promise<import("./schema/schedule.schema").Schedule>;
    getTotalStudentsAssignedToTeacher(id: string): Promise<{
        success: boolean;
        totalStudents: number;
        todayClasses: number;
    }>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<import("./schema/schedule.schema").Schedule>;
    remove(id: string): Promise<import("./schema/schedule.schema").Schedule>;
}
