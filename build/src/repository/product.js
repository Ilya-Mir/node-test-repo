"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = void 0;
const product_entity_1 = require("../schemas/product.entity");
const getAllProducts = () => {
    return product_entity_1.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (id) => {
    return product_entity_1.products.find(product => product.id === id);
};
exports.getProductById = getProductById;
