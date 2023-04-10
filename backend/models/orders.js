const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postal: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  accountNo: {
    type: String,
    required: true
  },
  products: {
    type: [],
    required: true
  },
  status: {
    type: String,
  },
  trackingNo: {
    type: String,
  }
});

module.exports = mongoose.model('Orders', orderSchema);