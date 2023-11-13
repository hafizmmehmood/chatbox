const express = require('express');
const serviceRouter = express.Router();
const { checkAuth } = require('../middlewares/checkAuth');
const { isSuperAdmin } = require('../libs/shared/role');

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
serviceRouter.use('/prod', require('../services/product/index'))
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
