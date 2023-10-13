"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productHandler = exports.productsHandler = void 0;
const user_1 = require("../services/user");
const return_unauthorized_1 = require("../utils/return-unauthorized");
const user_2 = require("./user");
const product_1 = require("../services/product");
const productsHandler = (req, res) => {
    const id = req.get(user_2.ID_HEADER_NAME);
    const user = id && (0, user_1.getUserById)(id);
    if (!user) {
        (0, return_unauthorized_1.returnUnauthorized)(res);
        return;
    }
    const result = (0, product_1.getProducts)();
    res
        .status(200)
        .send({ data: result, error: null });
};
exports.productsHandler = productsHandler;
const productHandler = (req, res) => {
    const id = req.get(user_2.ID_HEADER_NAME);
    const user = id && (0, user_1.getUserById)(id);
    if (!user) {
        (0, return_unauthorized_1.returnUnauthorized)(res);
        return;
    }
    const result = (0, product_1.getProduct)(req.query.productId.toString());
    if (result) {
        res
            .status(200)
            .send({ data: result, error: null });
    }
    else {
        res.status(404).send({
            "data": null,
            "error": {
                "message": "No product with such id"
            }
        });
    }
};
exports.productHandler = productHandler;
