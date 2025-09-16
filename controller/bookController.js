const query = require("../db/queries");

async function getBooks(req, res, next) {
  const genres = await query.getGenries();
  const books = await query.getBooks();
  if (!books) next(new Error("No books exist."));
  res.render("display", { title: "All books", books, type: "Book",genres });
}

async function getBookById(req, res, next) {
  const genres = await query.getGenries();
  const id = req.params.id;
  const book = await query.getBookById(id);
  if (!book) next(new Error("No such book exist."));
  res.render("bookDisplay", {
    title: book[0].title,
    book: book[0],
    genres,
  });
}

async function getAddBookForm(req, res) {
  const genres = await query.getGenries();
  res.render("addBookForm", { type: "Add book", title: "Add book", genres });
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
  if (!Array.isArray(data.genres) && data.genres) {
    data.genres = [data.genres];
  }
  console.log(data);
  await query.updateBook(data);
  res.redirect(`/book/${data.id}`);
}

async function postDeleteBook(req, res) {
  const id = req.params.id;
  await query.deleteBook(id);
  res.redirect("/book/all");
}

module.exports = {
  getBooks,
  getBookById,
  getAddBookForm,
  postBook,
  getBookUpdate,
  postBookUpdate,
  postDeleteBook
};
