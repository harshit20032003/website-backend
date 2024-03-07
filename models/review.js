var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var review = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, },
    rating: { type: Number, required: true },
    review:{ type: String, required: true },
    product_id:{type:String, required: true},
    title:{type:String, required: true}

  }
)
var Review = mongoose.model('Review', review)
module.exports = Review