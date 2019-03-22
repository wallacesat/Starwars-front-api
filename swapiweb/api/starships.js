import express from "express";
const router = express.Router();

var starships = require("./fakeData/db.json").starships;

router.get("/starships", function(req, res) {
  return res.status(200).json({
    data: starships
  });
});

export default router;
