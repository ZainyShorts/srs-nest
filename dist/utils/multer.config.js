"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptionsForXlxs = exports.multerOptions = exports.uploadsPath = void 0;
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
exports.uploadsPath = path.join(process.cwd(), 'uploads');
exports.multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, callback) => {
            if (!fs.existsSync(exports.uploadsPath)) {
                fs.mkdirSync(exports.uploadsPath, { recursive: true });
            }
            callback(null, exports.uploadsPath);
        },
        filename: (req, file, callback) => {
            const ext = file.mimetype.split('/')[1];
            const uniqueSuffix = Date.now() + '-' + file.originalname + '.' + ext;
            callback(null, uniqueSuffix);
        },
    }),
};
exports.multerOptionsForXlxs = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, callback) => {
            if (!fs.existsSync(exports.uploadsPath)) {
                fs.mkdirSync(exports.uploadsPath, { recursive: true });
            }
            callback(null, exports.uploadsPath);
        },
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + file.originalname;
            callback(null, uniqueSuffix);
        },
    }),
};
//# sourceMappingURL=multer.config.js.map