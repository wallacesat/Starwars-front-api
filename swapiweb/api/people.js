import express from "express";
const router = express.Router();

var people = require("./fakeData/db.json").people;

router.get("/people", function(req, res) {
  return res.status(200).json({
    data: people
  });
});

export default router;
