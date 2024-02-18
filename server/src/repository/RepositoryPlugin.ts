import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { RecipeRepository } from "./RecipeRepository";
import { Recipe } from "../models/Recipe";
import { RecipeSummary } from "../models/RecipeSummary";
import { FilterSchema } from "../models/BaseFilter";
import { Type } from "@sinclair/typebox";

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

  done();
};

export default fp(Repositories, {
  name: "repository",
  fastify: "4.x",
});
