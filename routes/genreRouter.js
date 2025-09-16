const { Router } = require("express");
const Controller = require('../controller/genreController');
const genreRouter = Router();

genreRouter.get("/create",Controller.getGenreCreate); //create genre
genreRouter.post("/create",Controller.postGenreCreate);

genreRouter.post("/:name/delete",Controller.postGenreDelete)//delete

genreRouter.get("/:name/update",Controller.getGenreUpdate);//update genre
genreRouter.post("/:name/update",Controller.postGenreUpdate);

genreRouter.get("/:name",Controller.getBooksByGenre);//get books per genre

module.exports = genreRouter;
