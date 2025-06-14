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
exports.GlobalService = void 0;
const common_1 = require("@nestjs/common");
const storage_blob_1 = require("@azure/storage-blob");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
let GlobalService = class GlobalService {
    constructor() {
        this.azureConnection = process.env
            .AZURE_STORAGE_CONNECTION_STRING;
        this.containerName = process.env.AZURE_CONTAINER_NAME || 'student-files';
    }
    getBlobClient(imageName) {
        const blobClientService = storage_blob_1.BlobServiceClient.fromConnectionString(this.azureConnection);
        const containerClient = blobClientService.getContainerClient(this.containerName);
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient;
    }
    async upload(file, folder) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const uniqueFileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
            const blobName = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;
            const blobClient = this.getBlobClient(blobName);
            const buffer = await fs_1.promises.readFile(file.path);
            const contentType = this.getContentType(file.originalname);
            await blobClient.uploadData(buffer, {
                blobHTTPHeaders: {
                    blobContentType: contentType,
                },
            });
            await fs_1.promises.unlink(file.path);
            return blobClient.url;
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    }
    async uploadMultiple(files, folder) {
        const uploadPromises = files.map((file) => this.upload(file, folder));
        return Promise.all(uploadPromises);
    }
    async deleteFile(blobName) {
        try {
            const blobClient = this.getBlobClient(blobName);
            const deleteResponse = await blobClient.delete();
            return deleteResponse._response.status === 202;
        }
        catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }
    getContentType(filename) {
        const extension = filename.toLowerCase().split('.').pop();
        const contentTypes = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            pdf: 'application/pdf',
            doc: 'application/msword',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        };
        return contentTypes[extension || ''] || 'application/octet-stream';
    }
    getFileUrl(blobName) {
        const blobClient = this.getBlobClient(blobName);
        return blobClient.url;
    }
};
exports.GlobalService = GlobalService;
exports.GlobalService = GlobalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GlobalService);
//# sourceMappingURL=global.service.js.map