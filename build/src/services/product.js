"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = void 0;
const product_1 = require("../repository/product");
function getProducts() {
    return (0, product_1.getAllProducts)();
}
exports.getProducts = getProducts;
function getProduct(id) {
    return (0, product_1.getProductById)(id);
}
exports.getProduct = getProduct;
