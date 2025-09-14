const pool = require("./pool");

async function getGenries() {
  const genries = await pool.query("SELECT * FROM genre");
  return genries.rows;
}

async function getBooksByGenre(genre) {
  const books = await pool.query(
    "SELECT b.* FROM genre AS g JOIN book_genre AS bg ON g.id=bg.genreid JOIN book AS b ON b.id=bg.bookid WHERE g.name LIKE $1",
    [genre]
  );
  return books.rows;
}

async function getBooks() {
  const books = await pool.query("SELECT * FROM book");
  return books.rows;
}

async function getBookGenres(bookid) {
  const genres = await pool.query(
    "SELECT g.name AS genres FROM genre AS g JOIN book_genre ON g.id = book_genre.genreid WHERE book_genre.bookid = $1",
    [bookid]
  );
  return genres.rows;
}

async function getBookAuthors(bookid) {
  const authors = await pool.query(
    "SELECT a.name AS author FROM author AS a JOIN book_author ON a.id = book_author.authorid WHERE book_author.bookid = $1",
    [bookid]
  );
  return authors.rows;
}

async function getBookById(id) {
  const book = await pool.query("SELECT * FROM book WHERE id = $1", [id]);
  const genResult = await getBookGenres(id);
  const authResult = await getBookAuthors(id);
  const genres = [];
  const authors = [];
  for (let i = 0; i < genResult.length; i++) {
    genres.push(genResult[i].genres);
  }
  for (let i = 0; i < authResult.length; i++) {
    authors.push(authResult[i].author);
  }
  book.rows[0].genres = genres;
  book.rows[0].authors = authors;
  return book.rows;
}

async function createBook(book) {
  const bookid = await pool.query(
    "INSERT INTO book(title,description,rating) VALUES($1,$2,$3) RETURNING id",
    [book.title, book.desc, book.rating]
  );

  let authorid = await pool.query(
    "INSERT INTO author(name) VALUES($1) ON CONFLICT (name) DO NOTHING RETURNING id ",
    [book.author]
  );
  if (authorid.rows.length == 0)
    authorid = await pool.query("SELECT id FROM author WHERE name=$1", [
      book.author,
    ]);
  await pool.query("INSERT INTO book_author (authorid,bookid) VALUES($1,$2)", [
    authorid.rows[0].id,
    bookid.rows[0].id,
  ]);

  for (let i = 0; i < book.genres.length; i++) {
    const genre = await pool.query("SELECT id FROM genre WHERE name=$1", [
      book.genres[i],
    ]); //get genre
    await pool.query("INSERT INTO book_genre (genreid,bookid) VALUES($1,$2)", [
      genre.rows[0].id,
      bookid.rows[0].id,
    ]); //add row corresponding to the genre for the book
  }
}

async function updateBook(newBook) {
  await pool.query(
    "UPDATE book SET title=$1, description=$2, rating=$3 WHERE id=$4",
    [newBook.title, newBook.desc, newBook.rating, newBook.id]
  );

  await pool.query(
    "UPDATE author SET name=$1 WHERE name=(SELECT a.name FROM author AS a JOIN book_author AS ba ON ba.authorid=a.id JOIN book AS b ON b.id=ba.bookid WHERE b.id=$2)",
    [newBook.author, newBook.id]
  );

  await pool.query("DELETE FROM book_genre WHERE bookid=$1", [newBook.id]);

  for (let i = 0; i < newBook.genres.length; i++) {
    const genre = await pool.query("SELECT id FROM genre WHERE name=$1", [
      newBook.genres[i],
    ]); //get genre
    await pool.query("INSERT INTO book_genre (genreid,bookid) VALUES($1,$2)", [
      genre.rows[0].id,
      newBook.id,
    ]); //add row corresponding to the genre for the book
  }
}

async function createGenre(genre) {
  await pool.query("INSERT INTO genre(name) VALUES($1)", [genre]);
}

async function updateGenre(newGenre, id) {
  await pool.query("UPDATE genre SET name=$1 WHERE id=$2", [newGenre, id]);
}

async function getGenre(name){
  const genre = await pool.query('SELECT * FROM genre WHERE name ILIKE $1',[`%${name}%`]);
  return genre.rows[0];
}

module.exports = {
  getGenries,
  getBooksByGenre,
  getBooks,
  getBookById,
  createBook,
  updateBook,
  createGenre,
  updateGenre,
  getGenre,
};
