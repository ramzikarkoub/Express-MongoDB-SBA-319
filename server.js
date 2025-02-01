const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
dotenv.config();

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log(`Yoo! it is connected to ${mongoose.connection.name}!!!`);
});

app.listen(PORT, () => {
  console.log(`daa servaaar is connected on port ${PORT}`);
});
