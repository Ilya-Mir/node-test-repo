import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany} from "typeorm";
import { Products } from "./Products";
import { Cart } from "./Cart";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @ManyToMany(() => Products, (product) => product.id)
  product: Products;

  @Column()
  count: number;
}
