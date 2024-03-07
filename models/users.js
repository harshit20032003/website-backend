var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var users = new Schema(
  {
    username: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    user_id: Number,
    password: { type: String, required: true, },
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
var Users = mongoose.model('Users', users)
module.exports = Users