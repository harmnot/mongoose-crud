const { Book, Member, Transaction, Model } = require("../model");

class Controller {
  static createBook(req, res, next) {
    Book.create(new Book({ ...req.body }))
      .then(created => {
        res.status(200).send({ msg: `succesfully created`, data: created });
      })
      .catch(err => {
        next(err);
      });
  }

  static findAllBook(req, res, next) {
    Book.find()
      .then(books => {
        if (books.length == 0) {
          res.status(200).json({ msg: "book is empty" });
        } else {
          res.status(302).json({ data: books });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static createMember(req, res, next) {
    Member.create(new Member({ ...req.body }))
      .then(created => {
        res.status(200).send({ msg: `created`, data: created });
      })
      .catch(err => {
        next(err);
      });
  }

  static findAllMembers(req, res, next) {
    Member.find({})
      .then(members => {
        if (members.length == 0) {
          res.status(202).send({ msg: `none of members yet` });
        } else {
          res.status(201).json(members);
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static updateOneInMember(req, res, next) {
    Member.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { runValidators: true }
    )
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        next(err);
      });
  }

  static updateOneInBook(req, res, next) {
    Book.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { runValidators: true }
    )
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        next(err);
      });
  }

  static deleteBook(req, res, next) {
    Book.findOneAndDelete({ _id: req.params.id })
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        next(err);
      });
  }

  static deleteMember(req, res, next) {
    Member.findOneAndDelete({ _id: req.params.id })
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        next(err);
      });
  }

  static transaction(req, res, next) {
    Transaction.find()
      .then(transaksi => {
        res.status(201).json(transaksi);
      })
      .catch(err => {
        next(err);
      });
  }

  static createTransaction(req, res, next) {
    Transaction.create(new Transaction({ ...req.body }))
      .then(created => {
        res.status(201).json(created);
      })
      .catch(err => {
        next(err);
      });
  }

  static updateOneTransaction(req, res, next) {
    Transaction.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        next(err);
      });
  }

  static deleteTransaction(req, res, next) {
    Transaction.findOneAndDelete({ _id: req.params.id })
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(err => {
        next(err);
      });
  }

  static findOneBook(req, res, next) {
    Book.find({
      $or: [{ title: req.params.field }, { author: req.params.field }]
    })
      .then(getAll => res.status(200).json(getAll))
      .catch(err => {
        next(err);
      });
  }

  static findTheTransaction(req, res, next) {
    Transaction.find({ _id: req.params.book })
      .populate("booklist")
      .then(getone => {
        res.status(200).json(getone);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = Controller;
