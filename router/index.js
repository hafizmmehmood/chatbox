const express = require('express');
const serviceRouter = express.Router();
const { checkAuth } = require('../middlewares/checkAuth');
const { isSuperAdmin } = require('../libs/shared/role');
const Product = require('../models/Product');

/**
 * @Route Admin Panel Routes
 * @dev These routes use for the admin panel.
 */
// To create super admin
serviceRouter.get('/admin/superAdmin', (req, res) =>
  require('../services/admin/admins/routes')['apiRoute'](
    req,
    res,
    'createSuperAdmin'
  )
);
/**
 * End
 */

/**
 * @Route Admin Panel Routes
 * @dev These routes use for the admin panel.
 * Jwt Authentication used for these routes.
 */
/////// Auth Api
serviceRouter.use('/auth', require('../services/auth'));
serviceRouter.use('/prod', [checkAuth], require('../services/product'));

//To Add and Remove Sample Data
serviceRouter.get('/deleteAll', async (req, res) => {
  let resp = await Product.deleteMany({});
  res.send(resp);
});

serviceRouter.get('/insertOne', async (req, res) => {
  console.log("object")
  let resp = await Product.create(
    {
      "title": "Smartphone Case",
      "sku": "SC1234",
      "color": [
        "Black",
        "Blue",
        "Red"
      ],
      "description": "Protect your smartphone in style with our sleek and durable Smartphone Case available in multiple vibrant colors.",
      "category": "Electronics",
      "price": 14.99,
      "sale_price": 12.99
    }
  );
  res.send(resp);
}
);
///////// =====

/////// Admin Api
serviceRouter.use(
  '/admin/admins',
  [checkAuth, isSuperAdmin],
  require('../services/admin/admins')
);
///////// =====
/**
 * End
 */

module.exports = serviceRouter;
