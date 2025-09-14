import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT || 5002,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    API_KEY:process.env.API_KEY,
}   