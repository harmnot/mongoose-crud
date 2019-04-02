const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactions_schema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: "Member" },
  in_date: Date,
  out_date: Date,
  due_date: Date,
  fine: Number,
  booklist: [{ type: Schema.Types.ObjectId, ref: "Book" }]
});

transactions_schema.pre("save", next => {
  this.out_date = new date();
  next();
});

transactions_schema.post("save", (transaksi, next) => {
  if (transaksi.in_date > transaksi.out_date) {
    transaksi.fine =
      Math.round(
        Math.abs(
          transaksi.in_date.getTime() -
            (transaksi.due_date.getTime() / 24) * 60 * 60 * 1000
        )
      ) * 1000;
    transaksi.save();
    next();
  }
});

const Transaction = mongoose.model("Transaction", transactions_schema);

module.exports = Transaction;
