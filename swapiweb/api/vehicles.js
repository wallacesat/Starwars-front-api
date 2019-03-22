import express from "express";
const router = express.Router();

var vehicles = require("./fakeData/db.json").vehicles;

router.get("/vehicles", function(req, res) {
  return res.status(200).json({
    data: vehicles
  });
});

export default router;
