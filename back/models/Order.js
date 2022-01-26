const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  products: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}],
  date: {type: Date, default: new Date}
});

module.exports = model('Order', orderSchema);
