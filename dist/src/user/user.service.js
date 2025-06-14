"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const teacher_service_1 = require("../teacher/teacher.service");
const jwt_1 = require("@nestjs/jwt");
const enum_1 = require("../../utils/enum");
const student_service_1 = require("../student/student.service");
let UserService = class UserService {
    constructor(teacherService, studentService, jwtService) {
        this.teacherService = teacherService;
        this.studentService = studentService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password, type) {
        console.log('type', type);
        if (type === enum_1.UserRole.Teacher) {
            return this.teacherService.validateTeacher({ email, password });
        }
        if (type === enum_1.UserRole.Student) {
            return this.studentService.validateStudent({ email, password });
        }
    }
    generateJwt(user) {
        return this.jwtService.sign({ sub: user._id, email: user.email });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService,
        student_service_1.StudentService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map