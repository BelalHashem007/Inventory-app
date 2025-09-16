const query = require("../db/queries");

async function getBooksByGenre(req, res, next) {
  const genres = await query.getGenries();
  let genre = req.params.name;
  const books = await query.getBooksByGenre(genre);
  if (!books) return next(new Error("There is no books for this genre"));
  const title = genre.slice(0, 1).toUpperCase() + genre.slice(1);
  res.render("display", { title, books, type: "Genre", genre, genres });
}

async function getGenreCreate(req, res) {
  const genres = await query.getGenries();
  res.render("genreForm", { title: "Add genre", type: "Create", genres });
}
async function getGenreUpdate(req, res) {
  const genres = await query.getGenries();
  const genre = req.params.name;
  res.render("genreForm", {
    title: "Update genre",
    type: "Update",
    genre,
    genres,
  });
}

async function postGenreUpdate(req, res) {
  const newName = req.body.genre;
  const genre = await query.getGenre(req.params.name);
  console.log(genre);
  await query.updateGenre(newName, genre.id);
  res.redirect("/genre/" + newName);
}

async function postGenreCreate(req, res) {
  const genre = req.body.genre;
  if (!genre) throw new Error("Data missing");
  await query.createGenre(genre);
  res.redirect("/");
}

async function postGenreDelete(req, res) {
  const genre = req.params.name;
  await query.deleteGenre(genre);
  res.redirect("/");
}

module.exports = {
  getBooksByGenre,
  getGenreCreate,
  postGenreCreate,
  getGenreUpdate,
  postGenreUpdate,
  postGenreDelete,
};
