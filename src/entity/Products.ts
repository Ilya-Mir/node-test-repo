import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Products {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  price: number

}
