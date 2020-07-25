const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order_name: {
    type: String
  }
});

module.exports = Order = mongoose.model('orders', OrderSchema);