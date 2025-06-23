declare class ScheduleDayDto {
    startTime: string;
    endTime: string;
    date: string;
}
export declare class CreateScheduleDto {
    courseName: string;
    className: string;
    section: string;
    note: string;
    teacherId: string;
    courseId: string;
    dayOfWeek: ScheduleDayDto[];
}
export {};
