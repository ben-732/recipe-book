// Generate the client-side code from the OpenAPI schema using npx ng-openapi-gen

const path = require("path");
const exec = require("child_process").exec;

const output = path.join(__dirname, "../src/generated");
const input = path.join(__dirname, "../openapi.json");

// Generate schema and feed std out to console

console.log("Generating client-side code from OpenAPI schema...");

const childProcess = exec(
  `npx ng-openapi-gen --input ${input} --output ${output} --ignore-unused-models false`
);

childProcess.stdout.on("data", (data) => {
  console.log(data.trim());
});

childProcess.stderr.on("data", (data) => {
  console.error(data);
});
