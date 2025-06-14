"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUploadsFolder = ensureUploadsFolder;
exports.countTokens = countTokens;
exports.generateUniqueFileName = generateUniqueFileName;
exports.decodeJwt = decodeJwt;
const path = require("path");
const fs = require("fs");
function ensureUploadsFolder() {
    const uploadsPath = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
    }
}
function countTokens(text) {
    return text.split(/\s+/).length;
}
function generateUniqueFileName() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    const fileName = `file_${timestamp}_${random}`;
    return fileName;
}
function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64)
        .split('')
        .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
        .join(''));
    return JSON.parse(jsonPayload);
}
//# sourceMappingURL=methods.js.map