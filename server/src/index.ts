import Fastify from "fastify";
import dotenv from "dotenv";

import { Database } from "./interface/database";

Database.connect();

dotenv.config();

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

fastify.register(import("./routes/home"), { prefix: "/home" });

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;

fastify.listen({ port }, (err, address) => {
  if (err) throw err;
});
