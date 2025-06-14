"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseOutlineStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Teacher"] = "Teacher";
    UserRole["Student"] = "Student";
    UserRole["Admin"] = "Admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var courseOutlineStatus;
(function (courseOutlineStatus) {
    courseOutlineStatus["Pending"] = "Pending";
    courseOutlineStatus["Rejected"] = "Rejected";
    courseOutlineStatus["Approved"] = "Approved";
})(courseOutlineStatus || (exports.courseOutlineStatus = courseOutlineStatus = {}));
//# sourceMappingURL=enum.js.map