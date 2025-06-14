"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeModule = void 0;
const common_1 = require("@nestjs/common");
const grade_controller_1 = require("./grade.controller");
const grade_service_1 = require("./grade.service");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("../course/schema/course.schema");
const schema_garde_1 = require("./schema/schema.garde");
let GradeModule = class GradeModule {
};
exports.GradeModule = GradeModule;
exports.GradeModule = GradeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: schema_garde_1.Grade.name, schema: schema_garde_1.GradeSchema },
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
            ]),
        ],
        controllers: [grade_controller_1.GradeController],
        providers: [grade_service_1.GradeService],
    })
], GradeModule);
//# sourceMappingURL=grade.module.js.map