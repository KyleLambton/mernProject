const mongoose = require('mongoose');

const paddleOresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  image: {
    type: [String],
    required: true
  },
  features: {
    type: [[Mixed]],
    required: false
  },
  specifications: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Product', paddleOresSchema);