"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const student_module_1 = require("./student/student.module");
const guardian_module_1 = require("./guardian/guardian.module");
const teacher_module_1 = require("./teacher/teacher.module");
const course_module_1 = require("./course/course.module");
const schedule_module_1 = require("./schedule/schedule.module");
const attendance_module_1 = require("./attendance/attendance.module");
const department_module_1 = require("./department/department.module");
const activity_module_1 = require("./activity/activity.module");
const club_module_1 = require("./club/club.module");
const global_module_1 = require("./global/global.module");
const grade_module_1 = require("./grade/grade.module");
const user_module_1 = require("./user/user.module");
const aws_module_1 = require("./aws/aws.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
            student_module_1.StudentModule,
            guardian_module_1.GuardianModule,
            teacher_module_1.TeacherModule,
            course_module_1.CourseModule,
            schedule_module_1.ScheduleModule,
            attendance_module_1.AttendanceModule,
            department_module_1.DepartmentModule,
            activity_module_1.ActivityModule,
            club_module_1.ClubModule,
            global_module_1.GlobalModule,
            grade_module_1.GradeModule,
            user_module_1.UserModule,
            aws_module_1.AwsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map