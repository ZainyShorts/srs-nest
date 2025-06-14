import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './schema/schema.attendace';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    markAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    getTeacherViewAttendance(room: string, section: string, date: string, courseId: string, teacherId?: string): Promise<Attendance[]>;
}
