const { Router } = require("express");
const Controller = require('../controller/genreController');
const genreRouter = Router();

genreRouter.get("/");

module.exports = genreRouter;
