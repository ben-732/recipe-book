import { FastifyInstance } from "fastify";
import { Recipe } from "../../models/Recipe";
import { FilterSchema } from "../../models/BaseFilter";
import { Static, Type } from "@sinclair/typebox";

/**
 * Add a recipe
 */
export default (fastify: FastifyInstance) => {
  fastify.post<{ Querystring: Static<typeof FilterSchema> }>(
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
      const newRecipe = await fastify.repository.recipes.add(
        request.body as Static<typeof Recipe.FieldsSchema>
      );
      reply.send(newRecipe);
    }
  );
};
