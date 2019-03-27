import express from "express";

const router = express.Router();

var people = require("./fakeData/db.json").people;

router.get("/people", function(req, res) {
  return res.status(200).json({
    count: people.count,
    results: people.results[0]
  });
});

router.get("/people/:page", function(req, res) {
  let { page } = req.params;
  page = page.slice(5, 6) - 1;

  if (!people.results[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    count: people.count,
    results: people.results[page]
  });
});

export default router;
