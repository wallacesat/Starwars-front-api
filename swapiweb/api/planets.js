import express from "express";

import { handleResulstWithId } from "./utils/handleResultsWithId";

const router = express.Router();

var planets = require("./fakeData/db.json").planets;

router.get("/planets", function(req, res) {
  return res.status(200).json({
    pageCount: planets.pageCount,
    results: handleResulstWithId(planets.pages[0], 1),
    page: 1
  });
});

router.get("/planets/:page", function(req, res) {
  let { page } = req.params;

  page = page.slice(5, 6) - 1;

  if (!planets.pages[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    pageCount: planets.pageCount,
    results: handleResulstWithId(planets.pages[page], page + 1),
    page: page + 1
  });
});

export default router;
