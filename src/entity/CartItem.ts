import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Products } from "./Products";
import { Cart } from "./Cart";
import {Order} from "./Order";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, {nullable: true})
  cart: Cart | null

  @ManyToOne(() => Order, (order) => order.items, {nullable: true})
  order: Order | null;

  @OneToOne(() => Products,  (product) => product.id, {
    cascade: true,
  })
  @JoinColumn()
  product: Products

  @Column()
  count: number;
}
