const query = require("../db/queries");

async function getBooks(req, res, next) {
  const books = await query.getBooks();
  if (!books) next(new Error("No books exist."));
  res.render("display", { title: "All books", books,type:"Book" });
}

async function getBookById(req, res, next) {
  const id = req.params.id;
  const book = await query.getBookById(id);
  if (!book) next(new Error("No such book exist."));
  res.render("bookDisplay", {
    title: book[0].title,
    book: book[0],
  });
}

async function getAddBookForm(req, res) {
  const genres = await query.getGenries();
  res.render("addBookForm", { type: "Add", title: "Add book", genres });
}

async function postBook(req, res) {
  const body = req.body;
  if (!body) throw new Error("no data");
  await query.createBook(body);
  res.redirect("/");
}

async function getBookUpdate(req, res) {
  const id = req.params.id;
  const book = await query.getBookById(id);
  if (!book) next(new Error("No such book exist."));
  const genres = await query.getGenries();
  res.render("addBookForm", {
    type: "Update",
    title: book[0].title,
    book: book[0],
    genres,
  });
}

async function postBookUpdate(req, res) {
  const data = req.body;
  data.id = Number(req.params.id);
  if (!Array.isArray(data.genres)) {
    data.genres = [data.genres];
  }
  console.log(data);
  await query.updateBook(data);
  res.redirect(`/book/${data.id}`);
}

module.exports = {
  getBooks,
  getBookById,
  getAddBookForm,
  postBook,
  getBookUpdate,
  postBookUpdate,
};
