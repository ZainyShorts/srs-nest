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
exports.GlobalController = void 0;
const common_1 = require("@nestjs/common");
const global_service_1 = require("./global.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../../utils/multer.config");
let GlobalController = class GlobalController {
    constructor(globalService) {
        this.globalService = globalService;
    }
    async uploadToAzureBlobStorage(file) {
        return await this.globalService.upload(file);
    }
};
exports.GlobalController = GlobalController;
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GlobalController.prototype, "uploadToAzureBlobStorage", null);
exports.GlobalController = GlobalController = __decorate([
    (0, common_1.Controller)('global'),
    __metadata("design:paramtypes", [global_service_1.GlobalService])
], GlobalController);
//# sourceMappingURL=global.controller.js.map