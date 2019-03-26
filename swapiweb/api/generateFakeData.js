import jsf from "json-schema-faker";
import { red, inverse, green } from "chalk";
import fs from "fs";
import path from "path";
import chance from "chance";

const schema = require("./fakeData/fakeSchema.json");

jsf.extend("chance", () => chance());

const idAvatar = Math.random(80);

jsf.format("urlAvatar40", () => {
  return `http://i.pravatar.cc/40?img=${idAvatar}`;
});

jsf.format("urlAvatar120", () => {
  return `http://i.pravatar.cc/120?img=${idAvatar}`;
});

jsf.format("peopleUrl", () => {
  return "https://swapi.co/api/people/11/";
});

jsf.format("planetsUrl", () => {
  return "https://swapi.co/api/planets/4/";
});

jsf.format("starshipsUrl", () => {
  return "https://swapi.co/api/starships/5/";
});

jsf.format("vehiclesUrl", () => {
  return "hhttps://swapi.co/api/vehicles/4/";
});

jsf.resolve(schema).then(sample => {
  console.log(sample);

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
