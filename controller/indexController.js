const query = require("../db/queries");
async function getIndex(req, res) {
  const genres = await query.getGenries();
  res.render("index", { title: "Library", genres });
}

module.exports = { getIndex };
