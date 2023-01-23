const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://db-note-app:123456abcd789@cluster0.zabyatq.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

const startServer = async () => {
  try {
    await mongoose.connect(dbURI);
    app.listen(5000);
  } catch (error) {
    console.error({ error });
  }
};
startServer();

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/notes");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/notes", noteRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
