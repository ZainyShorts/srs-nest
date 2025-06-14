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
exports.AwsService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let AwsService = class AwsService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new client_s3_1.S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }
    async generateSignedUrl(fileName, contentType) {
        try {
            const key = `${Date.now()}-${fileName}`;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                ContentType: contentType,
            });
            console.log(command);
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 60 * 5 });
            return {
                success: false,
                statusCode: common_1.HttpStatus.OK,
                msg: {
                    url,
                    key,
                },
            };
        }
        catch (e) {
            console.log(e);
            return { success: false, statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }
    async deleteFile(key) {
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            await this.s3.send(command);
            return {
                success: true,
                statusCode: common_1.HttpStatus.OK,
                msg: `File ${key} deleted successfully`,
            };
        }
        catch (error) {
            console.log(`Failed to delete file: ${error.message}`);
            return {
                success: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                msg: error.message,
            };
        }
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsService);
//# sourceMappingURL=aws.service.js.map