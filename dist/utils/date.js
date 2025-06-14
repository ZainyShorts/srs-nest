"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalTimeFromUTC = getLocalTimeFromUTC;
function getLocalTimeFromUTC(utcTime, TimeZone) {
    return new Date(utcTime).toLocaleString('en-US', { timeZone: TimeZone });
}
//# sourceMappingURL=date.js.map