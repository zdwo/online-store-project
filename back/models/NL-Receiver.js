const { Schema, model } = require('mongoose');

const receiverSchema = new Schema({
  email: { type: String, required: true},
});

module.exports = model('Receiver', receiverSchema);
