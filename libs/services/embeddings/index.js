const Embeddings = require("../../../models/Embeddings");

const createEmbedding = async (obj) => {
    let newEmbedding = await Embeddings.create(obj);
    if (newEmbedding) {
        return newEmbedding;
    } else {
        return false;
    }
}

module.exports = createEmbedding