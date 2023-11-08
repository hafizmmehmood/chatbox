const product = require("../../../controllers/product/index");

exports.productRoute = async (req, res, name) => {
    try {

        const resp = await product[name](req);
        // console.log(resp);
        res.status(resp?.code || 200).json(resp);
    } catch (err) {
        // console.log(err);
        res.status(err).json(err);
    }
};
