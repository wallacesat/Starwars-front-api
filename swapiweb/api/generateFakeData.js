import faker from "json-schema-faker";
import { yellow, red } from "chalk";
import fs from "fs";
import path from "path";
import chance from "chance";

const schema = require("./fakeData/fakeSchemaData.json");

faker.format("urlAvatar40", () => {
  return "http://placehold.it/40x40";
});

faker.format("urlAvatar120", () => {
  return "http://placehold.it/120x120";
});

faker.extend("chance", () => chance());

faker.resolve(schema).then(sample => {
  fs.writeFile(
    path.resolve("./api/fakeData/db.json"),
    JSON.stringify(sample),
    {
      encoding: "uth8"
    },
    err => {
      if (err) {
        console.log(red("Error generating fake data!"));
        return;
      }
      console.log(yellow("Fake data generated!"));
    }
  );
});
