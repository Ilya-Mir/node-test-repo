"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutUser = exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const user_entity_1 = require("../schemas/user.entity");
const usersIds = [
    user_entity_1.userEntity
];
let usersInfo = [
    user_entity_1.user,
    user_entity_1.user2
];
const getUser = (userId) => {
    return usersInfo.find((userInfo) => userInfo.cart.userId === userId);
};
exports.getUser = getUser;
const updateUser = (userBody, userId) => {
    const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);
    changedUser.cart = {
        ...changedUser.cart,
        ...userBody
    };
    return changedUser;
};
exports.updateUser = updateUser;
const deleteUser = (userId) => {
    const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);
    changedUser.cart = {
        ...changedUser.cart,
        isDeleted: true
    };
    return true;
};
exports.deleteUser = deleteUser;
const checkoutUser = (userId) => {
    const changedUser = usersInfo.find(userInfo => userInfo.cart.userId === userId);
    return {
        "order": {
            ...changedUser.cart,
            "payment": {
                "type": "paypal",
                "address": "London",
                "creditCard": "1234-1234-1234-1234"
            },
            "delivery": {
                "type": "post",
                "address": "London"
            },
            "comments": "",
            "status": "created",
            "total": 500
        }
    };
};
exports.checkoutUser = checkoutUser;
