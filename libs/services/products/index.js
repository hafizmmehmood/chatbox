const Product = require("../../../models/Product");

const createProduct = async (obj) => {
    let newProduct = await Product.create(obj);
    if (newProduct) {
        return newProduct;
    } else {
        return false;
    }
}
const getAllProducts = async () => {
    let products = await Product.find();
    if (products) {
        return products;
    } else {
        return false;
    }
}

const findProduct = async (obj) => {
    let products = await Product.find(obj);
    if (products.length) {
        return products[0];
    } else {
        return false;
    }
}




module.exports = {
    createProduct,
    getAllProducts,
    findProduct,
}