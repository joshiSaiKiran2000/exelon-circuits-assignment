const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  ratings: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Product', productSchema);
