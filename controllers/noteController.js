const Note = require("../models/note");

const note_index = (req, res) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { notes: result, title: "All notes" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const note_details = (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then((result) => {
      res.render("details", { note: result, title: "Note Details" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Note not found" });
    });
};

const note_create_get = (req, res) => {
  res.render("create", { title: "Create a new note" });
};

const note_create_post = (req, res) => {
  const blog = new Note(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/notes");
    })
    .catch((err) => {
      console.log(err);
    });
};

const note_delete = (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/notes" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  note_index,
  note_details,
  note_create_get,
  note_create_post,
  note_delete,
};
