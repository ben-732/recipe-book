import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import * as Actions from "../commands/recipes/";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const RecipeController: FastifyPluginCallback = (f, options, done) => {
  const fastify = f.withTypeProvider<TypeBoxTypeProvider>();

  Actions.Get(fastify);
  Actions.GetById(fastify);
  Actions.Add(fastify);
  // Actions.Update(fastify);
  // Actions.Delete(fastify);

  done();
};

export default fp(RecipeController, {
  name: "recipe-controller",
  fastify: "4.x",
  dependencies: ["api"],
  encapsulate: true,
});
