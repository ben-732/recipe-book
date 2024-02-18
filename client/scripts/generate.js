// Generate the client-side code from the OpenAPI schema using npx ng-openapi-gen

const path = require("path");
const exec = require("child_process").exec;

const output = path.join(__dirname, "../src/generated");
const input = path.join(__dirname, "../openapi.json");

console.log(`npx ng-openapi-gen --input "${input}" --output "${output}"`);

exec(`npx ng-openapi-gen --input ${input} --output ${output}`);
