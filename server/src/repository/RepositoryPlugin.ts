import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { RecipeRepository } from "./RecipeRepository";
import { TagRepository } from "./TagRepository";

declare module "fastify" {
  interface FastifyInstance {
    repository: {
      recipes: RecipeRepository;
      tags: TagRepository;
    };
  }
}

const Repositories: FastifyPluginCallback = (fastify, options, done) => {
  fastify.decorate("repository", {
    recipes: new RecipeRepository(),
    tags: new TagRepository(),
  });

  done();
};

export default fp(Repositories, {
  name: "repository",
  fastify: "4.x",
});
