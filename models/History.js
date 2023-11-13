const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const historySchema = new Schema({
    title: String,
    sku: String,
    color: Array,
    description: String,
    category: String,
    tokens: Number,
    price: Number,
    sale_price: Number,
    embedding: Array,
    gpt_desc: String
})

const History = mongoose.model('History', historySchema);

module.exports = History;