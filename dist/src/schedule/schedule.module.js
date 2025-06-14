"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_service_1 = require("./schedule.service");
const schedule_controller_1 = require("./schedule.controller");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_schema_1 = require("./schema/schedule.schema");
const student_module_1 = require("../student/student.module");
const student_schema_1 = require("../student/schema/student.schema");
let ScheduleModule = class ScheduleModule {
};
exports.ScheduleModule = ScheduleModule;
exports.ScheduleModule = ScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            student_module_1.StudentModule,
            mongoose_1.MongooseModule.forFeature([
                { name: schedule_schema_1.Schedule.name, schema: schedule_schema_1.ScheduleSchema },
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
            ]),
        ],
        controllers: [schedule_controller_1.ScheduleController],
        providers: [schedule_service_1.ScheduleService],
    })
], ScheduleModule);
//# sourceMappingURL=schedule.module.js.map