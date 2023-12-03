import debug from "debug";


const mongoose = require("mongoose");

let uri = process.env.DATABASE_URL;

console.warn(uri);

const dbLogger = debug("app:db");

main().catch(err => console.log(err));

export async function main() {
  dbLogger("Connecting to the database...");

  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })



  const connection = mongoose.connection;

  connection.once("open", function() {
    dbLogger("MongoDB database connection established successfully");
  });


}

