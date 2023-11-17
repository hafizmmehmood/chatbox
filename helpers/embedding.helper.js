const Product = require("../models/product.model");


const updateEmbededArray = async (product, embedding) => {
    let newProduct = await Product.findByIdAndUpdate(product._id, {
        embedding: embedding?.data[0]?.embedding,
        tokens: embedding?.usage?.total_tokens
    }, {
        new: true,
    });
    if (newProduct) {
        console.log("New Product:", newProduct);
        return newProduct;
    } else {
        return false;
    }
}

const cosinesim = (A, B) => {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;

    for (var i = 0; i < A.length; i++) {
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = dotproduct / (mA * mB);

    return similarity;
}

module.exports = {
    updateEmbededArray,
    cosinesim
}