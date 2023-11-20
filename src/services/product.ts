import AppDataSource from "../data-source";
import {Products} from "../entity/Products";

export async function getProductsService() {

  const products = await AppDataSource.manager.find(Products)

  return products;
}

export async function getProductService(id: string) {

  const product = await AppDataSource.manager.find(Products, {
    where: {
      id
    }
  })

  return product
}
