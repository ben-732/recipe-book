import { FastifyPluginCallback } from "fastify";
import * as Actions from "../commands/recipes/";

const RecipeController: FastifyPluginCallback = (fastify, options, done) => {
  Actions.Get(fastify);
  Actions.GetById(fastify);
  // Actions.Add(fastify);
  // Actions.Update(fastify);
  // Actions.Delete(fastify);

  done();
};

export default RecipeController;
