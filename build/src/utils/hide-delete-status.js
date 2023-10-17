"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideDeleteUserStatus = void 0;
const hideDeleteUserStatus = (user) => {
    var _a;
    const { ...userWithoutDeletedStatus } = user;
    (_a = userWithoutDeletedStatus === null || userWithoutDeletedStatus === void 0 ? void 0 : userWithoutDeletedStatus.cart) === null || _a === void 0 ? true : delete _a.isDeleted;
    return userWithoutDeletedStatus;
};
exports.hideDeleteUserStatus = hideDeleteUserStatus;
