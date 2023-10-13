"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./controllers/user");
const product_1 = require("./controllers/product");
const app = (0, express_1.default)();
const profileRouter = express_1.default.Router();
const productsRouter = express_1.default.Router();
// const authRouter = express.Router();
profileRouter.get('/card', (req, res) => {
    (0, user_1.getUserHandler)(req, res);
});
profileRouter.put('/card', (req, res) => {
    (0, user_1.updateUserHandler)(req, res);
});
profileRouter.delete('/card', (req, res) => {
    (0, user_1.removeUserHandler)(req, res);
});
profileRouter.post('/card/checkout', (req, res) => {
    (0, user_1.checkoutHandler)(req, res);
});
productsRouter.put('/:userId/groups', (req, res) => {
    (0, product_1.productHandler)(req, res);
});
productsRouter.get('/', (req, res) => {
    (0, product_1.productsHandler)(req, res);
});
// authRouter.post('/register', () => {});
// authRouter.get('/login', () => {});
const logger = (req, res, next) => {
    console.log(`New request: ${req.method}, ${req.url}`);
    next();
};
app.use(logger);
app.use((req, res, next) => {
    const id = req.get(user_1.ID_HEADER_NAME);
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
app.use('/api/profile', profileRouter);
app.use('/api/products', productsRouter);
// app.use('/api/auth', authRouter);
app.listen(3000, () => {
    console.log('Server is started');
});
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
