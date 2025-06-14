import { GlobalService } from './global.service';
import { UploadedFileType } from 'utils/multer.config';
export declare class GlobalController {
    private readonly globalService;
    constructor(globalService: GlobalService);
    uploadToAzureBlobStorage(file: UploadedFileType): Promise<string>;
}
