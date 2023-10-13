import express, {Request, Response} from "express";
import {checkoutHandler, getUserHandler, removeUserHandler, updateUserHandler} from "./controllers/user";
import {productHandler, productsHandler} from "./controllers/product";

export const profileRouter = express.Router();
export const productsRouter = express.Router();
// const authRouter = express.Router();

profileRouter.get('/card', (req: Request, res: Response) => {
  getUserHandler(req, res)
});
profileRouter.put('/card',  (req: Request, res: Response) => {
  updateUserHandler(req, res);
});
profileRouter.delete('/card', (req: Request, res: Response) => {
  removeUserHandler(req, res)
});
profileRouter.post('/card/checkout', (req: Request, res: Response) => {
  checkoutHandler(req, res)
});
productsRouter.put('/:userId/groups', (req: Request, res: Response) => {
  productHandler(req, res)
});
productsRouter.get('/', (req: Request, res: Response) => {
  productsHandler(req, res)
});

// authRouter.post('/register', () => {});
// authRouter.get('/login', () => {});
