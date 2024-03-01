import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import RepositoryPlugin from "./repository/RepositoryPlugin";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { FilterSchema } from "./models/BaseFilter";
import { Recipe } from "./models/Recipe";
import { RecipeSummary } from "./models/RecipeSummary";
import { Tag } from "./models/Tag";

const Api: FastifyPluginCallback = (f, options, done) => {
  const fastify = f.withTypeProvider<TypeBoxTypeProvider>();

  // fastify.setValidatorCompiler(validator);

  // ---- Set up OpenApi Config ----
  fastify.register(import("@fastify/swagger"), {
    openapi: {
      info: {
        title: "Recipe API",
        description: "Recipe API",
        version: "0.1.0",
      },
      servers: [
        { url: "http://localhost:3000/api", description: "Local server" },
      ],
      tags: [{ name: "Recipes", description: "Recipe operations" }],
    },
    refResolver: {
      buildLocalReference(json, baseUri, fragment, i) {
        // Set title from id if title not set
        if (!json.title && json.$id) {
          json.title = json.$id;
        }

        // Fallback if no $id is present
        if (!json.$id) {
          return `def-${i}`;
        }

        return `${json.$id}`;
      },
    },
  });

  fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: "documentation",
  });

  // ---- Register schemas ---- TODO: Fix this registering thing
  fastify.addSchema(FilterSchema);
  fastify.addSchema(Recipe.Schema);
  fastify.addSchema(Recipe.FieldsSchema);
  fastify.addSchema(RecipeSummary.Schema);
  fastify.addSchema(Tag.Schema);

  // await setTimeout(() => Promise.resolve(), 1000);

  // console.log(fastify.getSchemas());

  // ---- Register Repositories ----
  fastify.register(RepositoryPlugin);

  // ---- Register routes ----
  fastify.register(import("./controllers/home"), { prefix: "/home" });
  fastify.register(import("./controllers/RecipeController"), {
    prefix: "/recipes",
  });

  done();
};

export default fp(Api, {
  name: "api",
  fastify: "4.x",
  encapsulate: true,
});
