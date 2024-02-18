import { FastifyInstance } from "fastify";
import { Recipe } from "../../models/Recipe";
import { Type } from "@sinclair/typebox";

/**
 * Get a recipe by its id
 */
export default (fastify: FastifyInstance) => {
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
          200: Type.Ref(Recipe.Schema),
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
};
