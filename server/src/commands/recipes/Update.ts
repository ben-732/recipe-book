import { FastifyInstance } from "fastify";
import { Recipe } from "../../models/Recipe";
import { FilterSchema } from "../../models/BaseFilter";
import { Static, Type } from "@sinclair/typebox";

/**
 * Add a recipe
 */
export default (fastify: FastifyInstance) => {
  fastify.patch<{ Body: Static<typeof Recipe.FieldsSchema> }>(
    "/",
    {
      schema: {
        tags: ["Recipes"],
        body: Type.Ref(Recipe.FieldsSchema),
        response: {
          200: Type.Ref(Recipe.Schema),
        },
      },
    },
    async (request, reply) => {
      const updatedRecipe = await fastify.repository.recipes.update(
        request.body
      );
      reply.send(updatedRecipe);
    }
  );
};
