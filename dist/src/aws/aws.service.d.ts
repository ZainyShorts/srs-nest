import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AwsService {
    private configService;
    private s3;
    private bucketName;
    constructor(configService: ConfigService);
    generateSignedUrl(fileName: string, contentType: string): Promise<{
        success: boolean;
        statusCode: HttpStatus;
        msg: {
            url: string;
            key: string;
        };
    } | {
        success: boolean;
        statusCode: HttpStatus;
        msg?: undefined;
    }>;
    deleteFile(key: string): Promise<any>;
}
