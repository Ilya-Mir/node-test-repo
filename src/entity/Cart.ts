import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm"
import {Users} from "./Users";
import {Products} from "./Products";
import {CartItem} from "./CartItem";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  userId: number;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}


