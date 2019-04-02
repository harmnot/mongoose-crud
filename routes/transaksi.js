const express = require("express");
const router = express.Router();
const Controller = require("../controller/service.js");

router.get("/", Controller.transaction);
router.post("/", Controller.createTransaction);
router.put("/:id", Controller.updateOneTransaction);
router.delete("/:id", Controller.deleteTransaction);
router.get("/:book", Controller.findTheTransaction);

router.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({ msg: `something error with database` });
  }
});

module.exports = router;
