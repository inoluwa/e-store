const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  unitCurrent_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  pending: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('Order', orderSchema);
