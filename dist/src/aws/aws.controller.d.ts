import { AwsService } from './aws.service';
export declare class AwsController {
    private readonly awsService;
    constructor(awsService: AwsService);
    deleteFile(param: {
        key: string;
    }): Promise<any>;
    getSignedUrl(filename: string, contentType: string): Promise<{
        success: boolean;
        statusCode: import("@nestjs/common").HttpStatus;
        msg: {
            url: string;
            key: string;
        };
    } | {
        success: boolean;
        statusCode: import("@nestjs/common").HttpStatus;
        msg?: undefined;
    }>;
}
