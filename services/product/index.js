const express = require("express");
const prodRouter = express.Router();
const routes = require("./routes/index");

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



module.exports = prodRouter;
