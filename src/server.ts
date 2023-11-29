import {Order} from "./schemas/order.entity";
import {Product} from "./schemas/product.entity";
import {Cart, CartItem} from "./schemas/cart.entity";
import {User} from "./schemas/user.entity";

const mongoose = require("mongoose");

let uri = "mongodb://localhost:27017/details";


main().catch(err => console.log(err));

export async function main() {
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })



  const connection = mongoose.connection;

  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });


}

