import Fastify from "fastify";
import dotenv from "dotenv";

import { Database } from "./interface/database";
import RepositoryPlugin from "./repository/RepositoryPlugin";

// TODO: Find a better way to do tis
Database.connect();

dotenv.config();

const fastify = Fastify({
  logger: true,
});
fastify.register(import("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Recipe API",
      description: "Recipe API",
      version: "0.1.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "recipes", description: "Recipe operations" }],
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
