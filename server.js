import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authUser from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use("/api/auth", authUser);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log(`Yoo! it is connected to ${mongoose.connection.name}!!!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
