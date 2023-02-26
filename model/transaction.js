const mongoose = require('mongoose');

const transactSchema = new mongoose.Schema({
  preferred_address: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.model('Transaction', transactSchema);
