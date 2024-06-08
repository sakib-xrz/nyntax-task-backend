const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const Car = require("./models/Car");
const Invoice = require("./models/Invoice");
const { calculateRentalCharges } = require("./utils/helpers");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/api/cars", async (req, res) => {
  try {
    const response = await axios.get(
      "https://exam-server-7c41747804bf.herokuapp.com/carsList"
    );
    const cars = response.data;

    await Car.deleteMany({});
    await Car.insertMany(cars.data);

    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car data" });
  }
});

app.post("/api/invoices", async (req, res) => {
  const {
    invoiceId,
    customerName,
    customerEmail,
    customerPhone,
    carId,
    pickupDate,
    dropoffDate,
    discount,
    hasDamage,
    hasInsurance,
    hasTax,
  } = req.body;

  try {
    const car = await Car.findOne({ id: carId });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    const additionalCharges = hasDamage
      ? 9
      : 0 + hasInsurance
      ? 15
      : 0 + hasTax
      ? 5
      : 0;

    const rentalDuration =
      (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60);
    const rentalCharges = calculateRentalCharges(rentalDuration, car);
    const discountAmount = rentalCharges * (discount / 100);
    const totalAmount = rentalCharges + additionalCharges - discountAmount;

    const invoice = new Invoice({
      invoiceId,
      customerName,
      customerEmail,
      customerPhone,
      carId,
      carName: `${car.make} ${car.model}`,
      pickupDate,
      dropoffDate,
      rentalDuration: parseInt(rentalDuration),
      discount: parseFloat(discountAmount).toFixed(2),
      damageCharge: hasDamage ? 9 : 0,
      insuranceCharge: hasInsurance ? 15 : 0,
      taxCharge: hasTax ? 11.5 : 0,
      totalAmount: parseFloat(totalAmount).toFixed(2),
    });

    await invoice.save();
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Failed to create invoice" });
  }
});

module.exports = app;
