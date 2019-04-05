import express from "express";

const router = express.Router();

var starships = require("./fakeData/db.json").starships;

router.get("/starships", function(req, res) {
  return res.status(200).json({
    count: starships.count,
    results: starships.results[0]
  });
});

router.get("/starships/:page", function(req, res) {
  let { page } = req.params;
  page = page.slice(5, 6) - 1;

  if (!starships.results[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    count: starships.count,
    results: starships.results[page]
  });
});

export default router;
