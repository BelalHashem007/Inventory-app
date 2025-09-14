const { Router } = require("express");
const Controller = require('../controller/genreController');
const genreRouter = Router();

genreRouter.get("/create",Controller.getGenreCreate);
genreRouter.get("/:name/update",Controller.getGenreUpdate);
genreRouter.post("/:name/update",Controller.postGenreUpdate);
genreRouter.post("/create",Controller.postGenreCreate);
genreRouter.get("/:name",Controller.getBooksByGenre);

module.exports = genreRouter;
