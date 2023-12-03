import express, { NextFunction, Request, Response } from "express";
import "./src/utils/init-dotenv";
import {
  ID_HEADER_NAME,
} from "./src/constants";
import debug from "debug";
import { authRouter, productsRouter, profileRouter } from "./src/router";
import { main } from "./src/server";
import {healthCheckHandler} from "./src/utils/health-check-handler";
import logger from "./src/utils/winston-logget";


const appLogger = debug("app:main");

const app = express();

const reqLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const { method, url } = req;

  res.on("finish", () => {
    const elapsedTime = Date.now() - startTime;
    logger.info(`${method} ${url} - ${elapsedTime} ms`);
  });

  next();
};

main();

app.use(reqLogger);
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const id = req.get(ID_HEADER_NAME);

  if (!id) {
    res.status(403).send({
      data: null,
      error: {
        message: "You must be authorized user",
      },
    });
    return;
  }

  next();
});

app.use("/api/health", healthCheckHandler);
app.use("/api/profile", profileRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.send({
    data: null,
    error: {
      message: "Internal Server error",
    },
  });
  next();
});

const server = app.listen(3000, () => {
  appLogger("Server is started");
});

const shutdown = () => {
  appLogger("Graceful shutdown started");

  server.close(() => {
    appLogger("Server closed");
    process.exit(0);
  });

};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
