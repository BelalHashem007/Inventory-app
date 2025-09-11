const query = require("../db/queries");
async function getIndex(req, res) {
  const genries = await query.getGenries();
  res.render("index", { title: "Library", genries });
}

module.exports = { getIndex };
