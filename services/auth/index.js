const express = require('express');
const routes = require('./routes');
const {
  loginValidator,
  resetValidator,
  forgetValidator,
  confirmUserValidator
} = require('./validator');
const { checkValidation } = require('../../middlewares/validator');
const { checkRefreshToken } = require('../../middlewares/checkRefreshToken')
const serviceRouter = express.Router();

serviceRouter.post('/login', [loginValidator, checkValidation], (req, res) =>
  routes['apiRoute'](req, res, 'authLogin')
);

serviceRouter.post('/refresh-token', [checkRefreshToken], (req, res) =>
  routes['apiRoute'](req, res, 'refreshToken')
);

serviceRouter.post(
  '/resetPassword',
  [resetValidator, checkValidation],
  (req, res) => routes['apiRoute'](req, res, 'resetPassword')
);
serviceRouter.post(
  '/forgetPassword',
  [forgetValidator, checkValidation],
  (req, res) => routes['apiRoute'](req, res, 'forgetPassword')
);
serviceRouter.post(
  '/confirmation',
  [confirmUserValidator, checkValidation],
  (req, res) => routes['apiRoute'](req, res, 'confirmation')
);

module.exports = serviceRouter;
