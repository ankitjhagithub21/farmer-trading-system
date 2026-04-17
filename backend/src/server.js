import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import farmerRouter from "./routes/farmerRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/farmers", farmerRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});