const mongoose = require("mongoose");
const schema = mongoose.Schema;
const customerSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  currentBalance: {
    type: Number,
    required: true,
    min: 0,
  },
});

const AllCustomer = mongoose.model("AllCustomer", customerSchema);

module.exports = AllCustomer;
