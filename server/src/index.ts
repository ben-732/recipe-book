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
