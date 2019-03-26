import express from "express";

import { handleResulstWithId } from "./utils/handleResultsWithId";

const router = express.Router();

var people = require("./fakeData/db.json").people;

router.get("/people", function(req, res) {
  return res.status(200).json({
    pageCount: people.pageCount,
    results: handleResulstWithId(people.pages[0], 1),
    page: 1
  });
});

router.get("/people/:page", function(req, res) {
  let { page } = req.params;
  page = page.slice(5, 6) - 1;

  if (!people.pages[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    pageCount: people.pageCount,
    results: handleResulstWithId(people.pages[page], page + 1),
    page: page + 1
  });
});

export default router;
