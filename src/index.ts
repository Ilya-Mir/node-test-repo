import {NextFunction} from "express";
import express, {Request, Response} from 'express';
import {
  checkoutHandler,
  getUserHandler,
  ID_HEADER_NAME,
  removeUserHandler,
  updateUserHandler
} from "./controllers/user";
import {productHandler, productsHandler} from "./controllers/product";


const app = express();
const profileRouter = express.Router();
const productsRouter = express.Router();
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
productsRouter.get('/', (req: Request, res: Response) => {
  productsHandler(req, res)
});
productsRouter.put('/:userId/groups', (req: Request, res: Response) => {
  productHandler(req, res)
});
// authRouter.post('/register', () => {});
// authRouter.get('/login', () => {});

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`New request: ${req.method}, ${req.url}`);
  next();
}

app.use(logger);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.send({
    "data": null,
    "error": {
      "message": "Internal Server error"
    }
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const id = req.get(ID_HEADER_NAME)

  if (!id) {
    res
        .status(403)
        .send({
          data: null,
          error: {
            "message": "You must be authorized user"
          }
        })
    return;
  }
});


app.use('/api/profile', profileRouter);
app.use('/api/products', productsRouter);
// app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is started');
})
