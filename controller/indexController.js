const query = require("../db/queries");

async function getIndex(req, res) {
  const genres = await query.getGenries();
  const books = await query.getBooks();
  if (!books) next(new Error("No books exist."));
  res.render("display", { title: "Home", books, type: "Home",genres });
}

module.exports = { getIndex };
