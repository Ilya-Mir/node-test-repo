import express, {Request, Response} from "express";
import {calculateUser, getUser, removeUser, updateUser} from "./controllers/user";
import {getProductById, getProducts} from "./controllers/product";
import {validateUser} from "./midllware/validateUser";

export const profileRouter = express.Router();
export const productsRouter = express.Router();
// const authRouter = express.Router();

profileRouter.get('/cart', async (req: Request, res: Response) => {
  await getUser(req, res)
});
profileRouter.put('/cart', validateUser,  async (req: Request, res: Response) => {
  await updateUser(req, res);
});
profileRouter.delete('/cart', async (req: Request, res: Response) => {
  await removeUser(req, res)
});
profileRouter.post('/cart/checkout', async (req: Request, res: Response) => {
  await calculateUser(req, res)
});
productsRouter.get('/:productId', async (req: Request, res: Response) => {
  await getProductById(req, res)
});
productsRouter.get('/', async (req: Request, res: Response) => {
  await getProducts(req, res)
});

// authRouter.post('/register', () => {});
// authRouter.get('/login', () => {});
