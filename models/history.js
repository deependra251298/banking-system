const mongoose = require("mongoose");
const { Schema } = mongoose;
const historySchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  senderAccount: {
    type: Number,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  recieverAccount: {
    type: Number,
    required: true,
  },
  recieverName: {
    type: String,
    required: true,
  },
});

const History = mongoose.model("History", historySchema);
module.exports = History;
