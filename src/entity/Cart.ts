import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn} from "typeorm"
import {Users} from "./Users";
import {Products} from "./Products";
import {CartItem} from "./CartItem";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (user) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: "user" })
  user: Users;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  items: CartItem[];
}


