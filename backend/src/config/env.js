
import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/farmer-trading-system",
  ORIGIN: process.env.ORIGIN || "http://localhost:5173",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
};

export default env;