import express from "express";

import { handleResulstWithId } from "./utils/handleResultsWithId";

const router = express.Router();

var starships = require("./fakeData/db.json").starships;

router.get("/starships", function(req, res) {
  return res.status(200).json({
    pageCount: starships.pageCount,
    results: handleResulstWithId(starships.pages[0], 1),
    page: 1
  });
});

router.get("/starships/:page", function(req, res) {
  let { page } = req.params;
  page = page.slice(5, 6) - 1;

  if (!starships.pages[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    pageCount: starships.pageCount,
    results: handleResulstWithId(starships.pages[page], page + 1),
    page: page + 1
  });
});

export default router;
