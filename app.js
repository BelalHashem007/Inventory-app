const express = require("express");
const path = require("node:path");
const app = express();
const indexRouter = require("./routes/indexRouter");
const genreRouter = require("./routes/genreRouter");
const bookRouter = require("./routes/bookRouter");

const PORT = 8000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/genre", genreRouter);
app.use("/book", bookRouter);
app.use("/", indexRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server is listening on PORT: ", PORT);
});
