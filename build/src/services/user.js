"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutUserData = exports.updateUserData = exports.deleteUserData = exports.getUserById = void 0;
const Joi = require('joi');
const user_1 = require("../repository/user");
const product_entity_1 = require("../schemas/product.entity");
function getUserById(userId) {
    return (0, user_1.getUser)(userId);
}
exports.getUserById = getUserById;
function deleteUserData(userId) {
    return (0, user_1.deleteUser)(userId);
}
exports.deleteUserData = deleteUserData;
function updateUserData(userData, id) {
    const userDataSchema = Joi.object({
        id: Joi.string()
            .required(),
        items: [
            Joi.object({
                product: Joi.object({
                    id: Joi.string().valid(...product_entity_1.products.map(product => product.id)).required(),
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    price: Joi.number().required()
                }),
                count: Joi.number().required()
            })
        ],
    });
    const { error, value } = userDataSchema.validate(userData);
    if (!error) {
        return { error, value };
    }
    else {
        return (0, user_1.updateUser)(userData, id);
    }
}
exports.updateUserData = updateUserData;
function checkoutUserData(id) {
    return (0, user_1.checkoutUser)(id);
}
exports.checkoutUserData = checkoutUserData;
