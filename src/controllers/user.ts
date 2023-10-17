import {calculateUserOrder, deleteUserData, getUserById, updateUserData} from "../services/user";
import {Request, Response} from "express";
import {hideDeleteUserStatus} from "../utils/hide-delete-status";
import {ID_HEADER_NAME} from "../constants";
import Joi from "joi";
import {products} from "../schemas/product.entity";

export const getUser = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)
  const user = getUserById(id);

  res
      .status(200)
      .send({data: hideDeleteUserStatus(user), error: null});
}

export const updateUser = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const userDataSchema = Joi.object({
    id: Joi.string()
        .required(),

    items: [
      Joi.object({
        product: Joi.object({
          id: Joi.string().valid(...products.map(product => product.id)).required(),
          title:  Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.number().required()
        }),
        count: Joi.number().required()
      })
    ],
  })

  const { error } = userDataSchema.validate(req.body);

  if (!error) {
    res
        .status(403)
        // @ts-ignore
        .send({data: null, error: {message: error}});
  } else {

    const result = updateUserData(req.body, id)

    if (result) {
      res
          .status(200)
          .send({data: hideDeleteUserStatus(result), error: null});
    } else {
      res
          .status(400)
          .send({data: null, error: {message: "User not deleted"}});
    }

  }
}

export const removeUser = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const result = deleteUserData(id)

  if (result) {
    res
        .status(200)
        .send({
          data: true,
          error: null
        });
    return;
  } else {
    res
        .status(400)
        .send({data: null, error: {message: "User not deleted"}});
    return;
  }
}

export const calculateUser = (req: Request, res: Response) => {
  const id = req.get(ID_HEADER_NAME)

  const result = calculateUserOrder(id)

  if (result) {
    res
        .status(200)
        .send({data: result, error: null});
  } else {
    res
        .status(400)
        .send({data: null, error: {message: "Unable to create an order"}});
  }
}
