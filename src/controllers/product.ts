import {Request, Response} from "express";
import {getProductService, getProductsService} from "../services/product";

export const getProducts = (req: Request, res: Response) => {

  const result = getProductsService()
  res
      .status(200)
      .send({data: result, error: null});
}

export const getProductById = (req: Request, res: Response) => {
  const result = getProductService(req.params.productId)

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
