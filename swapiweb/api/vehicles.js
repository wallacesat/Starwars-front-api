import express from "express";

import { handleResulstWithId } from "./utils/handleResultsWithId";

const router = express.Router();

var vehicles = require("./fakeData/db.json").vehicles;

router.get("/vehicles", function(req, res) {
  return res.status(200).json({
    pageCount: vehicles.pageCount,
    results: handleResulstWithId(vehicles.pages[0], 1),
    page: 1
  });
});

router.get("/vehicles/:page", function(req, res) {
  let { page } = req.params;
  page = page.slice(5, 6) - 1;

  if (!vehicles.pages[page]) {
    return res.status(404).send({
      error: {
        message: "Page Not Found!"
      }
    });
  }

  return res.status(200).json({
    pageCount: vehicles.pageCount,
    results: handleResulstWithId(vehicles.pages[page], page + 1),
    page: page + 1
  });
});

export default router;
