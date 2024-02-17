import { FastifyPluginCallback } from "fastify";
import { Recipe } from "../models/Recipe";
import { Type } from "@sinclair/typebox";

const RecipeController: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Recipes"],
        params: Type.Object(
          { id: Recipe.Schema.properties.id },
          { required: ["id"] }
        ),
        response: {
          200: { $ref: Recipe.Schema.$id },
        },
      },
    },
    async (request, reply) => {
      const recipe = await fastify.repository.recipes.get(request.params.id);
      if (!recipe || recipe.id !== request.params.id) {
        reply.status(404).send({ status: 404, message: "Recipe not found" });
        return;
      }

      reply.send(new Recipe(recipe));
    }
  );

  done();
};

// async function HandleGetRecipe(
//   request: FastifyRequest<{ Params: { id: string } }>,
//   reply: FastifyReply,
//   fastify: FastifyInstance
// ) {
// }

export default RecipeController;
