import { Model } from 'mongoose';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance, AttendanceDocument } from './schema/schema.attendace';
export declare class AttendanceService {
    private attendanceModel;
    constructor(attendanceModel: Model<AttendanceDocument>);
    markAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    summarizeAttendanceByStatus(data: any[]): Promise<{
        status: string;
        percentage: number;
        count: number;
        students: any[];
    }[]>;
    getTeacherViewAttendance(courseId: string, room: string, section: string, date: string, teacherId?: string): Promise<Attendance[]>;
    findByStudent(studentId: string): Promise<Attendance[]>;
}
