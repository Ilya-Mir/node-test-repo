import {CartEntity} from "../schemas/cart.entity";

const Joi = require('joi');


import {calculateUser, deleteUser, getUser, updateUser} from "../repository/user";

export function getUserById(userId: string) {
  return getUser(userId)
}

export function deleteUserData(userId: string) {
  return deleteUser(userId)
}

export function updateUserData(userData: CartEntity, id: string) {
 return updateUser(userData, id)
}

export function calculateUserOrder(id: string) {
  return calculateUser(id)
}
