import {CartEntity} from "../schemas/cart.entity";


import AppDataSource from "../data-source";
import {Cart} from "../entity/Cart";
import {createNewCart} from "../utils/creation-test";

export async function getUserById(userId: number) {
  const cartRepository = AppDataSource.getRepository(Cart);
  const userCart = await cartRepository.find({ where: { id: userId } });
  return userCart
}

export async function deleteUserData(userId: string) {
  const cartRepository =  AppDataSource.getRepository(Cart);

  await cartRepository.update(userId, { isDeleted: true });
  return true
}

export async function updateUserData(userData: CartEntity, id: number) {
  const cartRepository = AppDataSource.getRepository(Cart);
  await cartRepository.update(id, userData);
  const updatedUserCart = await cartRepository.find({ where: { id: id } });
  return updatedUserCart
}

export async function calculateUserOrder(id: string) {

  return null
}
