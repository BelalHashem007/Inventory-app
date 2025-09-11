const { Router } = require("express");
const Controller = require('../controller/bookController');
const bookRouter = Router();

bookRouter.get("/all",Controller.getBooks);

module.exports = bookRouter;
