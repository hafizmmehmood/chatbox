const express = require("express");
const prodRouter = express.Router();
const routes = require("./routes/index");
const { checkAuth } = require("../../middlewares/checkAuth");

prodRouter.get("/getEmbedding", (req, res) =>
    routes["productRoute"](req, res, "getEmbedding")
);

prodRouter.get("/searchProduct", (req, res) =>
    routes["productRoute"](req, res, "searchProduct")
);

prodRouter.get('/getSingleEmbedding', (req, res) =>
    routes["productRoute"](req, res, "getSingleEmbedding")
);


prodRouter.get('/getSemanticSearch', (req, res) =>
    routes["productRoute"](req, res, "getSemanticSearch")
);


prodRouter.get('/insertProdWithGpt', (req, res) =>
    routes["productRoute"](req, res, "insertProdWithGpt")
);

prodRouter.get('/searchProdWithLC', (req, res) =>
    routes["productRoute"](req, res, "searchProdWithLC")
);

prodRouter.get('/search',[checkAuth], (req, res) =>
  routes['productRoute'](req, res, 'searchProductFunc')
);


module.exports = prodRouter;
