"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const student_service_1 = require("./student.service");
const student_controller_1 = require("./student.controller");
const student_schema_1 = require("./schema/student.schema");
const guardian_module_1 = require("../guardian/guardian.module");
const guardian_schema_1 = require("../guardian/schema/guardian.schema");
const schema_attendace_1 = require("../attendance/schema/schema.attendace");
const course_schema_1 = require("../course/schema/course.schema");
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            guardian_module_1.GuardianModule,
            mongoose_1.MongooseModule.forFeature([
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
                { name: guardian_schema_1.Guardian.name, schema: guardian_schema_1.GuardianSchema },
                { name: schema_attendace_1.Attendance.name, schema: schema_attendace_1.AttendanceSchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
            ]),
        ],
        controllers: [student_controller_1.StudentController],
        providers: [student_service_1.StudentService],
        exports: [student_service_1.StudentService],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map