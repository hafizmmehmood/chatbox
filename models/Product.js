const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    sku: String,
    color: Array,
    description: String,
    category: String,
    tokens: Number,
    price: Number,
    sale_price: Number,
    embedding: Array,
    gpt_desc: String,
    workspaceId: Number
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;