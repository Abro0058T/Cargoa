const mongoose = require("mongoose");
const validator = require("validator");
//Registation Schema
const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: [true, "Please enter the name"],
  },
  to: {
    type: String,
    require: [true, "Please enter the email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  from: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 character"],
    select: false,
  },
  quantity: {
    type: Number,
    required: [true, "Please enter the quantity"],
  },
  address: {
    type: String,
    require: [true, "Please enter the address"],
  },
  transporter: {
    type: String,
    require: [true, "Please select a transporter"],
  },
});

module.exports = mongoose.model("Order", orderSchema);
