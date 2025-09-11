const query = require("../db/queries");

async function getBooks(req, res, next) {
  const books = await query.getBooks();
  if (!books) next(new Error("No books exist."));
  res.render("display", { title: "All books", books });
}

module.exports = {getBooks};
