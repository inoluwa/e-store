const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
});
module.exports.Role = mongoose.model('Role', roleSchema);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }

  ,
});

module.exports.User = mongoose.model('User', userSchema);
