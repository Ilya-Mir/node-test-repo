"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideDeleteStatus = void 0;
const hideDeleteStatus = (user) => {
    return delete user.cart.isDeleted;
};
exports.hideDeleteStatus = hideDeleteStatus;
