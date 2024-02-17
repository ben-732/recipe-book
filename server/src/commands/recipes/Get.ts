import { FastifyInstance } from "fastify";
import { Recipe } from "../../models/Recipe";
import { RecipeSummary } from "../../models/RecipeSummary";
import { FilterSchema } from "../../models/BaseFilter";
import { Static } from "@sinclair/typebox";

/**
 * Get a recipe by its id
 */
export default (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: Static<typeof FilterSchema> }>(
    "/",
    {
      schema: {
        tags: ["Recipes"],
        // TODO: Fix this, make it work with $ref ?
        querystring: FilterSchema,
        response: {
          200: { type: "array", items: { $ref: RecipeSummary.Schema.$id } },
        },
      },
    },
    async (request, reply) => {
      const recipes = await fastify.repository.recipes.getMultiple(
        request.query
      );

      reply.send(recipes);
    }
  );
};
