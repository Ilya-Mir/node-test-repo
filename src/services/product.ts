import {Product} from "../schemas/product.entity";

export async function getProductsService() {
  const products = await Product.find();
  console.warn(products);
  return products;
}

export async function getProductService(id: string) {
  const product = await Product.findById(id);
  return product
}
