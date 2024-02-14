import { FastifyPluginCallback } from "fastify";
import { Recipe } from "../models/Recipe";

const RecipeRouter: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get<{
    Reply: Recipe;
  }>("/:id", async (request, reply) => {
    const recipe = await fastify.repository.recipes.get(
      "e7348b71-ffbc-4b85-aa48-0b25cf89691a"
    );

    if (!recipe || recipe.id !== "e7348b71-ffbc-4b85-aa48-0b25cf89691a") {
      reply.status(404).send();
      return;
    }

    reply.send(new Recipe(recipe));
  });

  done();
};

export default RecipeRouter;
