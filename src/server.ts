import app, { port } from "./app";
import mongoose from "mongoose";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      const a = 10;
      console.log(`Example app listening at port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
