import express, {NextFunction, Request, Response} from 'express';
import {
  ID_HEADER_NAME,
} from "./constants";
import {authRouter, productsRouter, profileRouter} from "./router";
import bodyParser from "body-parser";
import {main} from "./server";


const app = express();

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`New request: ${req.method}, ${req.url}`);
  next();
}

main();
app.use(logger);
app.use(express.json());

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

  next();
});


app.use('/api/profile', profileRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.send({
    "data": null,
    "error": {
      "message": "Internal Server error"
    }
  });
  next()
});

app.listen(3000, () => {
  console.log('Server is started');
})
