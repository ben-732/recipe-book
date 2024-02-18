import { FastifyPluginCallback } from "fastify";
import * as Actions from "../commands/recipes/";
import { FilterSchema } from "../models/BaseFilter";
import { Recipe } from "../models/Recipe";
import { RecipeSummary } from "../models/RecipeSummary";

const RecipeController: FastifyPluginCallback = (fastify, options, done) => {
  fastify.addSchema(FilterSchema);
  fastify.addSchema(Recipe.Schema);
  fastify.addSchema(RecipeSummary.Schema);

  Actions.Get(fastify);
  Actions.GetById(fastify);
  // Actions.Add(fastify);
  // Actions.Update(fastify);
  // Actions.Delete(fastify);

  done();
};

export default RecipeController;
