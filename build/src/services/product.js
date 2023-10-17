"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductService = exports.getProductsService = void 0;
const product_1 = require("../repository/product");
function getProductsService() {
    return (0, product_1.getAllProducts)();
}
exports.getProductsService = getProductsService;
function getProductService(id) {
    return (0, product_1.getProductById)(id);
}
exports.getProductService = getProductService;
