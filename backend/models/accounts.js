const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('Accounts', accountsSchema);