"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutHandler = exports.removeUserHandler = exports.updateUserHandler = exports.getUserHandler = exports.ID_HEADER_NAME = void 0;
const user_1 = require("../services/user");
const return_unauthorized_1 = require("../utils/return-unauthorized");
const hide_delete_status_1 = require("../utils/hide-delete-status");
exports.ID_HEADER_NAME = "x-user-id";
const getUserHandler = (req, res) => {
    const id = req.get(exports.ID_HEADER_NAME);
    const user = id && (0, user_1.getUserById)(id);
    if (!user) {
        (0, return_unauthorized_1.returnUnauthorized)(res);
        return;
    }
    res
        .status(200)
        .send({ data: (0, hide_delete_status_1.hideDeleteStatus)(user), error: null });
};
exports.getUserHandler = getUserHandler;
const updateUserHandler = (req, res) => {
    const id = req.get(exports.ID_HEADER_NAME);
    const user = id && (0, user_1.getUserById)(id);
    if (!user) {
        (0, return_unauthorized_1.returnUnauthorized)(res);
        return;
    }
    const result = id && (0, user_1.updateUserData)(req.body, id);
    // @ts-ignore
    if (result === null || result === void 0 ? void 0 : result.error) {
        res
            .status(400)
            // @ts-ignore
            .send({ data: null, error: { message: result === null || result === void 0 ? void 0 : result.value } });
        return;
    }
    res
        .status(200)
        .send({ data: (0, hide_delete_status_1.hideDeleteStatus)(result), error: null });
};
exports.updateUserHandler = updateUserHandler;
const removeUserHandler = (req, res) => {
    const id = req.get(exports.ID_HEADER_NAME);
    const user = (0, user_1.getUserById)(id);
    if (!user) {
        (0, return_unauthorized_1.returnUnauthorized)(res);
        return;
    }
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
};
exports.removeUserHandler = removeUserHandler;
const checkoutHandler = (req, res) => {
    const id = req.get(exports.ID_HEADER_NAME);
    const user = (0, user_1.getUserById)(id);
    if (!user) {
        (0, return_unauthorized_1.returnUnauthorized)(res);
        return;
    }
    const result = (0, user_1.checkoutUserData)(id);
    res
        .status(200)
        .send({ data: (0, hide_delete_status_1.hideDeleteStatus)(result), error: null });
};
exports.checkoutHandler = checkoutHandler;
