const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: String,
  make: String,
  model: String,
  year: Number,
  type: String,
  seats: Number,
  bags: Number,
  features: [String],
  rates: {
    hourly: Number,
    daily: Number,
    weekly: Number,
  },
  imageURL: String,
});

module.exports = mongoose.model("Car", carSchema);
