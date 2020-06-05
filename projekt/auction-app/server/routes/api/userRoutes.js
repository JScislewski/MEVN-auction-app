const express = require("express");
const User = require("../../models/userModel");
const router = express.Router();

router.get("user/:userId", (req, res) => {
  const id = req.params.userId;
  User.findOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
