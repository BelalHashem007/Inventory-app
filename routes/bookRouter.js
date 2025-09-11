const { Router } = require("express");
const Controller = require('../controller/bookController');
const bookRouter = Router();

bookRouter.get("/");

module.exports = bookRouter;
