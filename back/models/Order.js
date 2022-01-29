const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user: { type: String, required: true},
  products: [{type: String, required: true}],
  date: {type: Date, default: new Date}
});

module.exports = model('Order', orderSchema);
