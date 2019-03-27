import express from "express";

const router = express.Router();

var planets = require("./fakeData/db.json").planets;

router.get("/planets", function(req, res) {
  return res.status(200).json({
    count: planets.count,
    results: planets.results[0]
  });
});

router.get("/planets/:page", function(req, res) {
  let { page } = req.params;

  page = page.slice(5, 6) - 1;

  if (!planets.results[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    count: planets.count,
    results: planets.results[page]
  });
});

export default router;
