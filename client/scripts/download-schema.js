// Download the schema from the server and save it to the file system using fetch

const fs = require("fs");
const path = require("path");

const url = "http://localhost:3000/api/documentation/json";
const dest = path.join(__dirname, "../openapi.json");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    fs.writeFileSync(dest, JSON.stringify(data, null, 2));
  });
