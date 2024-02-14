import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { Recipe } from "../models/Recipe";

const RecipeController: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get<{
    Reply: Recipe;
    Params: { id: string };
  }>("/:id", async (request, reply) =>
    HandleGetRecipe(request, reply, fastify)
  );

  done();
};

async function HandleGetRecipe(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) {
  const recipe = await fastify.repository.recipes.get(request.params.id);

  if (!recipe || recipe.id !== request.params.id) {
    reply.status(404).send();
    return;
  }

  reply.send(new Recipe(recipe));
}

export default RecipeController;
