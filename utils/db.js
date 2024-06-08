require("dotenv").config();

const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("🛢️  Database connection successful ✅");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });

    await mongoose.connect(URI);
  } catch (err) {
    console.error("🛢️  Failed to connect to database. ❌", err);
    process.exit(1);
  }
};

module.exports = connectDB;
