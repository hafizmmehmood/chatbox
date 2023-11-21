const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const embeddingsSchema = new Schema({
    prodId: { type: mongoose.Types.ObjectId, ref: "Product" },
    embedding: Array,
    gpt_desc: String
})

const Embeddings = mongoose.model('Embeddings', embeddingsSchema);

module.exports = Embeddings;