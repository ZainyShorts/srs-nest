declare class AssessmentComponentDto {
    score?: number;
    weightage?: number;
}
export declare class UpdateGradeDto {
    _id: string;
    teacherId?: string;
    courseId?: string;
    studentId?: string;
    class?: string;
    section?: string;
    quiz?: AssessmentComponentDto;
    midTerm?: AssessmentComponentDto;
    project?: AssessmentComponentDto;
    finalTerm?: AssessmentComponentDto;
    overAll?: number;
}
export declare class UpdateGradeListDto {
    grades: UpdateGradeDto[];
}
export {};
