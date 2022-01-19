const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = model('Cart', cartSchema);
