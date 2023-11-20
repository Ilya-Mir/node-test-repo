import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm"
import {Users} from "./Users";
import {Products} from "./Products";
import {CartItem} from "./CartItem";

type ORDER_STATUS = 'created' | 'completed';
@Entity()
export class Order {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (user) => user.id, {cascade: true})
  user: Users

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  items: CartItem[];

  @Column()
  payment: string


  @Column()
  delivery: string

  @Column()
  comments: string

  @Column()
  status: ORDER_STATUS;

  @Column()
  total: number
}
