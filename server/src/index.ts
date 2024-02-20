import Fastify from "fastify";
import dotenv from "dotenv";

import { Database } from "./interface/database";

// TODO: Find a better way/place to do tis
Database.connect();

dotenv.config();

const fastify = Fastify({
  logger: false,
});

// Declare a route
fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Register the api
fastify.register(import("./api"), { prefix: "/api" });

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;

fastify.listen({ port }, (err, address) => {
  if (err) throw err;
});
