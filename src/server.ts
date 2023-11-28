import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test2");

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log((error as { message: string }).message);
  }
}

main();
