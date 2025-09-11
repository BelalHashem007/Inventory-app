const { Router } = require("express");
const Controller = require('../controller/indexController');

const indexRouter = Router();

indexRouter.get("/",Controller.getIndex);

module.exports = indexRouter;
