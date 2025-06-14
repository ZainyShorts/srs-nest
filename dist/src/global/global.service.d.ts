import { UploadedFileType } from 'utils/multer.config';
export declare class GlobalService {
    private containerName;
    private azureConnection;
    constructor();
    private getBlobClient;
    upload(file: UploadedFileType, folder?: string): Promise<string>;
    uploadMultiple(files: UploadedFileType[], folder?: string): Promise<string[]>;
    deleteFile(blobName: string): Promise<boolean>;
    private getContentType;
    getFileUrl(blobName: string): string;
}
