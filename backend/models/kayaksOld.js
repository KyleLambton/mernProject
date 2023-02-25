const mongoose = require('mongoose');

const KayakSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  colour: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  startingDateAvailable: {
    type: Date,
    required: true
  },
  endingDateAvailable: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', KayakSchema);