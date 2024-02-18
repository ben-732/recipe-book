import Ajv from "ajv";
import { FastifySchema } from "fastify";
import addFormats from "ajv-formats";

// Avj with fastify baseline configuration https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validator-compiler
// Add string formats from ajv-formats https://www.npmjs.com/package/ajv-formats, recommended in TypeBox docs
const avj = addFormats(
  new Ajv({
    coerceTypes: "array",
    useDefaults: true,
    removeAdditional: true,
    uriResolver: require("fast-uri"),
    addUsedSchema: false,
    allErrors: false,
  }),
  [
    "date-time",
    "time",
    "date",
    "email",
    "hostname",
    "ipv4",
    "ipv6",
    "uri",
    "uri-reference",
    "uuid",
    "uri-template",
    "json-pointer",
    "relative-json-pointer",
    "regex",
  ]
);

export default function validator({ schema }: { schema: FastifySchema }) {
  return avj.compile(schema);
}
