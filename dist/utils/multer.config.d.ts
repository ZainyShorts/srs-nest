export declare const uploadsPath: string;
export declare const multerOptions: {
    storage: any;
};
export declare const multerOptionsForXlxs: {
    storage: any;
};
export interface UploadedFileType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    filename: string;
    path: string;
}
