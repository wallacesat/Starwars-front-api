import express from "express";
import { json } from "body-parser";
import { inverse, green } from "chalk";

import people from "./people";
import planets from "./planets";
import starships from "./starships";
import vehicles from "./vehicles";

const port = process.env.PORT || 3001;

const basePath = "/api";

const app = express();

app.use(json());
app.use(basePath, people);
app.use(basePath, planets);
app.use(basePath, starships);
app.use(basePath, vehicles);

app.listen(port, () => {
  console.log(
    inverse("\n Backend:") + green(` Api listening on port ${port}!\n`)
  );
});
