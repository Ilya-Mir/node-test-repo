import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {products} from "../schemas/product.entity";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {

  const userDataSchema = Joi.object({
    id: Joi.string()
        .required(),

    items: [
      Joi.object({
        product: Joi.object({
          id: Joi.string().valid(...products.map(product => product.id)).required(),
          title: Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.number().required()
        }),
        count: Joi.number().required()
      })
    ],
  })

  console.warn(req.body, 'here 1');

  const {error, value} = userDataSchema.validate(req.body);

  if (error) {
    res
        .status(400)
        .send({data: null, error: {message: `Validation failed, ${error.details[0].message}`}});
  } else {
    next()
  }
}
