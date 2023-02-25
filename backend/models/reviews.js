const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model('reviews', reviewSchema);