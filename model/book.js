const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const book_schema = new Schema({
  isbn: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true }
});

const Book = mongoose.model("Book", book_schema);

module.exports = Book;
