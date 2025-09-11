const pool = require("./pool");

async function getGenries() {
  const genries = await pool.query("SELECT * FROM genre");
  return genries.rows;
}

async function getBooksByGenre(genre) {
  const books = await pool.query(
    "SELECT b.* FROM genre AS g JOIN book_genre AS bg ON g.id=bg.genreid JOIN book AS b ON b.id=bg.bookid WHERE g.name ILIKE $1",
    [genre]
  );
  return books.rows;
}

async function getBooks() {
  const books = await pool.query("SELECT * FROM book");
  return books.rows;
}

module.exports = { getGenries, getBooksByGenre, getBooks };
