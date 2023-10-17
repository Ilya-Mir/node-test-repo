"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateUserOrder = exports.updateUserData = exports.deleteUserData = exports.getUserById = void 0;
const Joi = require('joi');
const user_1 = require("../repository/user");
function getUserById(userId) {
    return (0, user_1.getUser)(userId);
}
exports.getUserById = getUserById;
function deleteUserData(userId) {
    return (0, user_1.deleteUser)(userId);
}
exports.deleteUserData = deleteUserData;
function updateUserData(userData, id) {
    return (0, user_1.updateUser)(userData, id);
}
exports.updateUserData = updateUserData;
function calculateUserOrder(id) {
    return (0, user_1.calculateUser)(id);
}
exports.calculateUserOrder = calculateUserOrder;
