const Product = require('../../../controllers/products');

exports.apiRoute = async (req, res, name) => {
  try {
    const resp = await Product[name](req);
    res.status(resp.code).json(resp);
  } catch (err) {
    res.status(err.code || 500).json(err);
  }
};
