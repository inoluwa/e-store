const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.model('Categories', categoriesSchema);
