"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateUser = exports.removeUser = exports.updateUser = exports.getUser = void 0;
const user_1 = require("../services/user");
const hide_delete_status_1 = require("../utils/hide-delete-status");
const constants_1 = require("../constants");
const joi_1 = __importDefault(require("joi"));
const product_entity_1 = require("../schemas/product.entity");
const getUser = (req, res) => {
    const id = req.get(constants_1.ID_HEADER_NAME);
    const user = (0, user_1.getUserById)(id);
    res
        .status(200)
        .send({ data: (0, hide_delete_status_1.hideDeleteUserStatus)(user), error: null });
};
exports.getUser = getUser;
const updateUser = (req, res) => {
    const id = req.get(constants_1.ID_HEADER_NAME);
    const userDataSchema = joi_1.default.object({
        id: joi_1.default.string()
            .required(),
        items: [
            joi_1.default.object({
                product: joi_1.default.object({
                    id: joi_1.default.string().valid(...product_entity_1.products.map(product => product.id)).required(),
                    title: joi_1.default.string().required(),
                    description: joi_1.default.string().required(),
                    price: joi_1.default.number().required()
                }),
                count: joi_1.default.number().required()
            })
        ],
    });
    const { error } = userDataSchema.validate(req.body);
    if (!error) {
        res
            .status(403)
            // @ts-ignore
            .send({ data: null, error: { message: error } });
    }
    else {
        const result = (0, user_1.updateUserData)(req.body, id);
        if (result) {
            res
                .status(200)
                .send({ data: (0, hide_delete_status_1.hideDeleteUserStatus)(result), error: null });
        }
        else {
            res
                .status(400)
                .send({ data: null, error: { message: "User not deleted" } });
        }
    }
};
exports.updateUser = updateUser;
const removeUser = (req, res) => {
    const id = req.get(constants_1.ID_HEADER_NAME);
    const result = (0, user_1.deleteUserData)(id);
    if (result) {
        res
            .status(200)
            .send({
            data: true,
            error: null
        });
        return;
    }
    else {
        res
            .status(400)
            .send({ data: null, error: { message: "User not deleted" } });
        return;
    }
};
exports.removeUser = removeUser;
const calculateUser = (req, res) => {
    const id = req.get(constants_1.ID_HEADER_NAME);
    const result = (0, user_1.calculateUserOrder)(id);
    if (result) {
        res
            .status(200)
            .send({ data: result, error: null });
    }
    else {
        res
            .status(400)
            .send({ data: null, error: { message: "Unable to create an order" } });
    }
};
exports.calculateUser = calculateUser;
