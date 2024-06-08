const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceId: String,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  carId: String,
  carName: String,
  pickupDate: Date,
  dropoffDate: Date,
  rentalDuration: Number,
  discount: Number,
  damageCharge: Number,
  insuranceCharge: Number,
  taxCharge: Number,
  totalAmount: Number,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
