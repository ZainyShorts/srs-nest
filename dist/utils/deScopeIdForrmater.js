"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoId = void 0;
exports.generateMongoIdFormat = generateMongoIdFormat;
const crypto = require("crypto");
const mongoose_1 = require("mongoose");
function generateMongoIdFormat(input) {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return hash.substring(0, 24);
}
const mongoId = (id) => {
    return new mongoose_1.Types.ObjectId(generateMongoIdFormat(id));
};
exports.mongoId = mongoId;
//# sourceMappingURL=deScopeIdForrmater.js.map