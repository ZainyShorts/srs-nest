"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const course_schema_1 = require("./schema/course.schema");
const schedule_schema_1 = require("../schedule/schema/schedule.schema");
const course_outline_schema_1 = require("./schema/course-outline.schema");
const course_outline_service_1 = require("./course-outline.service");
const course_outline_controller_1 = require("./course-outline-controller");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: schedule_schema_1.Schedule.name, schema: schedule_schema_1.ScheduleSchema },
                { name: course_outline_schema_1.CourseOutline.name, schema: course_outline_schema_1.CourseOutlineSchema },
            ]),
        ],
        controllers: [course_controller_1.CourseController, course_outline_controller_1.CourseOutlineController],
        providers: [course_service_1.CourseService, course_outline_service_1.CourseOutlineService],
        exports: [course_service_1.CourseService, course_outline_service_1.CourseOutlineService],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map