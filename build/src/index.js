"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const router_1 = require("./router");
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
const app = (0, express_1.default)();
const logger = (req, res, next) => {
    console.log(`New request: ${req.method}, ${req.url}`);
    next();
};
app.use(logger);
app.use(jsonParser);
app.use((req, res, next) => {
    const id = req.get(constants_1.ID_HEADER_NAME);
    if (!id) {
        res
            .status(403)
            .send({
            data: null,
            error: {
                "message": "You must be authorized user"
            }
        });
        return;
    }
    next();
});
app.use('/api/profile', router_1.profileRouter);
app.use('/api/products', router_1.productsRouter);
// app.use('/api/auth', authRouter);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.send({
        "data": null,
        "error": {
            "message": "Internal Server error"
        }
    });
    next();
});
app.listen(3000, () => {
    console.log('Server is started');
});
