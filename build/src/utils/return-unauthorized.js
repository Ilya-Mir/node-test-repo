"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnUnauthorized = void 0;
const returnUnauthorized = (res) => {
    res
        .status(401)
        .send({
        data: null,
        error: {
            "message": "User is not authorized"
        }
    });
};
exports.returnUnauthorized = returnUnauthorized;
