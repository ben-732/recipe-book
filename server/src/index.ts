import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import Ajv from "ajv";
import dotenv from "dotenv";

import { Database } from "./interface/database";
import RepositoryPlugin from "./repository/RepositoryPlugin";
import validator from "./util/validator";

// TODO: Find a better way to do tis
Database.connect();

dotenv.config();

const fastify = Fastify({
  logger: false,
});

fastify.withTypeProvider<TypeBoxTypeProvider>();
fastify.setValidatorCompiler(validator);

fastify.register(import("@fastify/swagger"), {
  openapi: {
    info: {
      title: "Recipe API",
      description: "Recipe API",
      version: "0.1.0",
    },
    servers: [{ url: "http://localhost:3000", description: "Local server" }],
    tags: [{ name: "Recipes", description: "Recipe operations" }],
  },
  refResolver: {
    buildLocalReference(json, baseUri, fragment, i) {
      // Set title from id if title not set
      if (!json.title && json.$id) {
        json.title = json.$id;
      }

      // Fallback if no $id is present
      if (!json.$id) {
        return `def-${i}`;
      }

      return `${json.$id}`;
    },
  },
});

fastify.register(import("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
});

// Declare a route
fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Register the repositories plugin
fastify.register(RepositoryPlugin);

// Register routes
fastify.register(import("./controllers/home"), { prefix: "/home" });
fastify.register(import("./controllers/RecipeController"), {
  prefix: "/recipes",
});

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;

fastify.listen({ port }, (err, address) => {
  if (err) throw err;
});
