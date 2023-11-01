import {getAllProducts, getProductById} from "../repository/product";

export function getProductsService() {
  return getAllProducts()
}

export function getProductService(id: string) {
  return getProductById(id)
}
