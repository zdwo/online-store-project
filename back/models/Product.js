const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true},
  prize: { type: Number, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0}
});

module.exports = model('Product', productSchema);
