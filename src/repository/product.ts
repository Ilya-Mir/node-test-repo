import {products} from "../schemas/product.entity";

export const getAllProducts = () => {
 return products
}

export const getProductById = (id: string) => {
 return products.find(product => product.id === id)
}
