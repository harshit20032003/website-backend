var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var orders = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    locality:{ type: String, required: true } ,
    city:{ type: String, required: true } ,
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status:{type:String,default:"Pending"},
    cart: [
      {
        id: { type: Number, default: 0 },
        name: { type: String, default: 0 },
        price: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        size: { type: String, default: 0 },
      }
    ],

  }
)
var Orders = mongoose.model('Orders', orders)
module.exports = Orders