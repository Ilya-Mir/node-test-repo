import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from "typeorm"
import {Users} from "./Users";
import {Products} from "./Products";

type ORDER_STATUS = 'created' | 'completed';
@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Users, (user) => user.id)
  userId: number

  @ManyToMany(() => Products, (product) => product.id)
  @JoinTable()
  items: {
    product: Products,
    count: number
  }[]

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
