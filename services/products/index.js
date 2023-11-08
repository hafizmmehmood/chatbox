const express = require('express');
const routes = require('./routes');

const serviceRouter = express.Router();

serviceRouter.get('/search', (req, res) =>
  routes['apiRoute'](req, res, 'searchProduct')
);

module.exports = serviceRouter;
