const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  DoB: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Users', userSchema);