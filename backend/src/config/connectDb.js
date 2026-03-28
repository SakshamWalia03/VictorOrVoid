import config from "./config.js";
import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(config.databaseUrl);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Unable to connect to DB: ", error.message);
        process.exit(1);

    }
}