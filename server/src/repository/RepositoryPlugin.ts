import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { RecipeRepository } from "./RecipeRepository";
import { Recipe } from "../models/Recipe";
import { RecipeSummary } from "../models/RecipeSummary";

declare module "fastify" {
  interface FastifyInstance {
    repository: {
      recipes: RecipeRepository;
    };
  }
}

const Repositories: FastifyPluginCallback = (fastify, options, done) => {
  fastify.decorate("repository", {
    recipes: new RecipeRepository(),
  });
  fastify.addSchema(Recipe.Schema);
  fastify.addSchema(RecipeSummary.Schema);

  done();
};

export default fp(Repositories, {
  name: "repository",
  fastify: "4.x",
});
