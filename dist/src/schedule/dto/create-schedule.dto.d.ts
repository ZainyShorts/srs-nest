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
    dayOfWeek: ScheduleDayDto[];
}
export {};
