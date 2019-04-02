const express = require("express");
const router = express.Router();
const Controller = require("../controller/service.js");

router.get("/", Controller.findAllMembers);
router.post("/", Controller.createMember);
router.put("/:id", Controller.updateOneInMember);
router.delete("/:id", Controller.deleteMember);

router.use((err, req, res, next) => {
  if (err.code == 11000 || err.code == 11001) {
    res.status(400).json({ msg: `email already exist` });
  } else if (err.name == "ValidationError") {
    res.status(400).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: `something error with database` });
  }
});

module.exports = router;
