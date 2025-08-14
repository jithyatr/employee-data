import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connectDb() {
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to database");
    return db;

}

export default connectDb;