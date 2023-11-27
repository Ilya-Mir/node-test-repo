import {NextFunction, Request, Response} from "express";
import Joi from "joi";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {

  const userDataSchema = Joi.object({
    items: Joi.array().items(
      Joi.object({
        product: Joi.object({
          id: Joi.string().required(),
          title: Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.number().required()
        }),
        count: Joi.number().required()
      })
    )
  })


  const {error, value} = userDataSchema.validate(req.body);

  if (error) {
    res
        .status(400)
        .send({data: null, error: {message: `Validation failed, ${error.details[0].message}`}});
  } else {
    next()
  }
}
