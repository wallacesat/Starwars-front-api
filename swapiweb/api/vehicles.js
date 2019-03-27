import express from "express";

const router = express.Router();

var vehicles = require("./fakeData/db.json").vehicles;

router.get("/vehicles", function(req, res) {
  return res.status(200).json({
    count: vehicles.count,
    results: vehicles.results[0]
  });
});

router.get("/vehicles/:page", function(req, res) {
  let { page } = req.params;
  page = page.slice(5, 6) - 1;

  if (!vehicles.results[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    count: vehicles.count,
    results: vehicles.results[page]
  });
});

export default router;
