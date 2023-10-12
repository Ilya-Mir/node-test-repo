import {Request, Response} from "express";
import {getUserById} from "../services/user";
import {returnUnauthorized} from "../utils/return-unauthorized";
import {ID_HEADER_NAME} from "./user";
import {getProduct, getProducts} from "../services/product";

export const productsHandler = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)
  const user = getUserById(id);


  if (!user) {
    returnUnauthorized(res)
    return;
  }

  const result = getProducts()
  res
      .status(200)
      .send({data: result, error: null});
}

export const productHandler = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)
  const user = getUserById(id);


  if (!user) {
    returnUnauthorized(res)
    return;
  }

  const result = getProduct(req.query.productId.toString())

  if (result) {
    res
        .status(200)
        .send({data: result, error: null});
  } else {
    res.status(404).send({
      "data": null,
      "error": {
        "message": "No product with such id"
      }
    })
  }
}
