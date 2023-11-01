import {ProductEntity, products} from "../schemas/product.entity";

export const getAllProducts = () => {
 return products
}

export const getProductById = (id: string): ProductEntity | false => {
 return products.find(product => product.id === id)
}
