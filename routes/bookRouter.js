const { Router } = require("express");
const Controller = require("../controller/bookController");
const bookRouter = Router();

bookRouter.get("/create", Controller.getAddBookForm);
bookRouter.post("/create", Controller.postBook);
bookRouter.get("/all", Controller.getBooks);
bookRouter.post("/:id/delete",Controller.postDeleteBook);
bookRouter.get("/:id/update", Controller.getBookUpdate);
bookRouter.post("/:id/update", Controller.postBookUpdate);
bookRouter.get("/:id", Controller.getBookById);

module.exports = bookRouter;
