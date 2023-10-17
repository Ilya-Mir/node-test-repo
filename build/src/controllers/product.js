"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = void 0;
const product_1 = require("../services/product");
const getProducts = (req, res) => {
    const result = (0, product_1.getProductsService)();
    res
        .status(200)
        .send({ data: result, error: null });
};
exports.getProducts = getProducts;
const getProductById = (req, res) => {
    const result = (0, product_1.getProductService)(req.params.productId.toString());
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
exports.getProductById = getProductById;
