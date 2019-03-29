import jsf from "json-schema-faker";
import { red, inverse, green } from "chalk";
import fs from "fs";
import path from "path";
import chance from "chance";

const schema = require("./fakeData/fakeSchema.json");

jsf.extend("chance", () => chance());

jsf.format("avatar", () => {
  return `http://i.pravatar.cc/40?img=${Math.random(80)}`;
});

jsf.resolve(schema).then(sample => {
  fs.writeFile(
    path.resolve("./api/fakeData/db.json"),
    JSON.stringify(sample),
    {
      encoding: "utf8"
    },
    err => {
      if (err) {
        console.log(
          inverse("\n Backend:") + red(" Error generating fake data!")
        );
        return;
      }
      console.log(inverse("\n Backend:") + green(" Fake data generated!"));
    }
  );
});
