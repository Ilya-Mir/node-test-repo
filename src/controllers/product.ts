import {Request, Response} from "express";
import {getProductService, getProductsService} from "../services/product";

export const getProducts = async (req: Request, res: Response) => {

  const result = await getProductsService()
  res
      .status(200)
      .send({data: result, error: null});
}

export const getProductById = async (req: Request, res: Response) => {
  const result = await getProductService(req.params.productId)

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
