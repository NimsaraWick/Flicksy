import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async() =>{

    try{
        const conn = await  mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("MongoDB connected : " + conn.connection.host);
    }
    catch(error){
        console.log("Error connecting to MongoDB: " + error.message);
        if (process.env.NODE_ENV === "production") {
            process.exit(1); // Exit in production, but let server run in dev/testing
        }
    }
}