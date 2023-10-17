import express, {Request, Response} from "express";
import {calculateUser, getUser, removeUser, updateUser} from "./controllers/user";
import {getProductById, getProducts} from "./controllers/product";

export const profileRouter = express.Router();
export const productsRouter = express.Router();
// const authRouter = express.Router();

profileRouter.get('/cart', (req: Request, res: Response) => {
  getUser(req, res)
});
profileRouter.put('/cart',  (req: Request, res: Response) => {
  updateUser(req, res);
});
profileRouter.delete('/cart', (req: Request, res: Response) => {
  removeUser(req, res)
});
profileRouter.post('/cart/checkout', (req: Request, res: Response) => {
  calculateUser(req, res)
});
productsRouter.get('/:productId', (req: Request, res: Response) => {
  getProductById(req, res)
});
productsRouter.get('/', (req: Request, res: Response) => {
  getProducts(req, res)
});

// authRouter.post('/register', () => {});
// authRouter.get('/login', () => {});
