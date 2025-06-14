export declare class AttendanceEntryDto {
    _id: string;
    studentId: string;
    studentName: string;
    attendance: string;
    note?: string;
}
export declare class CreateAttendanceDto {
    teacherId: string;
    courseId: string;
    date: string;
    class: string;
    section: string;
    students: AttendanceEntryDto[];
}
