import { FastifyPluginCallback } from "fastify";

const HomeRouter: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/", (request, reply) => {
    reply.send({ message: "Router works" });
  });

  done();
};

export default HomeRouter;
