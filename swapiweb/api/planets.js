import express from "express";
const router = express.Router();

var planets = require("./fakeData/db.json").planets;

router.get("/planets", function(req, res) {
  return res.status(200).json({
    data: planets
  });
});

export default router;
