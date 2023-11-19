import "reflect-metadata"
import {DataSource} from "typeorm"
import {Users} from "./entity/Users"
import {Products} from "./entity/Products";
import {Cart} from "./entity/Cart";
import {Order} from "./entity/Order";
import {CartItem} from "./entity/CartItem";

const AppDataSource = new DataSource({
  host: 'localhost',
  port: 5432,
  username: 'node_gmp',
  password: 'password123',
  database: 'node_gmp',
  // migrationsRun: true,
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: [Users, Products, Cart, Order, CartItem],
  migrations: ["./build/src/migrations/*.js"],
  subscribers: [],
})

export const initDataSource = () => {
  AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!")
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
}


export default AppDataSource
