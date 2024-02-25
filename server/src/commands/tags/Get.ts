import { FastifyInstance } from "fastify";
import { FilterSchema } from "../../models/BaseFilter";
import { Static, Type } from "@sinclair/typebox";
import { Tag } from "../../models/Tag";

/**
 * Get multiple tags with optional filter
 */
export default (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: Static<typeof FilterSchema> }>(
    "/",
    {
      schema: {
        tags: ["Recipes"],
        // TODO: Fix this, make it work with $ref ?
        querystring: Type.Ref(FilterSchema),
        response: {
          200: { type: "array", items: Type.Ref(Tag.Schema) },
        },
      },
    },
    async (request, reply) => {
      const tags = await fastify.repository.tags.getMultiple(request.query);

      reply.send(tags);
    }
  );
};
