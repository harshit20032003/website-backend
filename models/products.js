var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var products = new Schema(
    {
        name: String,
        price: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        review: { type: Number, default: 0 },
        id: { type: Number,default: function() { return this.products.length; }},
        description: String,
        category: { type: String, default: 0 },
        size: { type: String, default: 'Size' },
        image: { type: [String], default: ["http://localhost:3001/shoea1.jpg", "http://localhost:3001/shoea1.jpg", "http://localhost:3001/shoea1.jpg"] }
    }
)
var Products = mongoose.model('Products', products)
module.exports = Products