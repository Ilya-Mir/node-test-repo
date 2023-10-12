import {getAllProducts, getProductById} from "../repository/product";

export function getProducts() {
  return getAllProducts()
}

export function getProduct(id: string) {
  return getProductById(id)
}
