import {CartEntity} from "../schemas/cart.entity";

const Joi = require('joi');


import {checkoutUser, deleteUser, getUser, updateUser} from "../repository/user";
import { products } from "../schemas/product.entity";

export function getUserById(userId: string) {
  return getUser(userId)
}

export function deleteUserData(userId: string) {
  return deleteUser(userId)
}

export function updateUserData(userData: CartEntity, id: string) {
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

  const { error, value } = userDataSchema.validate(userData);

  if (!error) {
    return { error, value }
  } else {
    return updateUser(userData, id)
  }
}

export function checkoutUserData(id: string) {
  return checkoutUser(id)
}
