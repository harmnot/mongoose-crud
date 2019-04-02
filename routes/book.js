const express = require("express");
const router = express.Router();
const Controller = require("../controller/service.js");

router.get("/", Controller.findAllBook);
router.post("/", Controller.createBook);
router.get("/:field", Controller.findOneBook);
router.put("/:id", Controller.updateOneInBook);
router.delete("/:id", Controller.deleteBook);

router.use((err, req, res, next) => {
  if (err.name == "ValidationError") {
    res.status(404).send({ msg: err.message });
  } else if (err) {
    res.status(500).json({ msg: `something error with database` });
  }
});
module.exports = router;
