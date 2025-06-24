declare class AssessmentComponentDto {
    score: number;
    weightage: number;
}
export declare class CreateGradeDto {
    teacherId: string;
    courseId: string;
    studentId: string;
    class: string;
    section: string;
    term: string;
    quiz: AssessmentComponentDto;
    midTerm: AssessmentComponentDto;
    project: AssessmentComponentDto;
    finalTerm: AssessmentComponentDto;
    overAll: number;
}
export declare class CreateGradeListDto {
    grades: CreateGradeDto[];
}
export {};
