import { FastifyInstance } from "fastify";
import { Recipe } from "../../models/Recipe";
import { FilterSchema } from "../../models/BaseFilter";
import { Static, Type } from "@sinclair/typebox";

/**
 * Add a recipe
 */
export default (fastify: FastifyInstance) => {
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Recipes"],
        params: Type.Object(
          { id: Recipe.Schema.properties.id },
          { required: ["id"] }
        ),
        response: {
          200: {},
        },
      },
    },
    async (request, reply) => {
      await fastify.repository.recipes.delete(request.params.id);
      reply.send({});
    }
  );
};
