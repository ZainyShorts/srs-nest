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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianController = void 0;
const common_1 = require("@nestjs/common");
const guardian_service_1 = require("./guardian.service");
const create_guardian_dto_1 = require("./dto/create-guardian.dto");
let GuardianController = class GuardianController {
    constructor(guardianService) {
        this.guardianService = guardianService;
    }
    async create(createGuardianDto) {
        return this.guardianService.create(createGuardianDto);
    }
    async findAll(page = 1, limit = 10) {
        return this.guardianService.findAll(Number(page), Number(limit));
    }
    async findOne(id) {
        return this.guardianService.findOne(id);
    }
};
exports.GuardianController = GuardianController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guardian_dto_1.CreateGuardianDto]),
    __metadata("design:returntype", Promise)
], GuardianController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GuardianController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuardianController.prototype, "findOne", null);
exports.GuardianController = GuardianController = __decorate([
    (0, common_1.Controller)('guardians'),
    __metadata("design:paramtypes", [guardian_service_1.GuardianService])
], GuardianController);
//# sourceMappingURL=guardian.controller.js.map