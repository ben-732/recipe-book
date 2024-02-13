import Fastify from "fastify";
import dotenv from "dotenv";

import { Database } from "./interface/database";
import { RecipeRepository } from "./repository/RecipeRepository";
import { IRecipeFields } from "./models/Recipe";

Database.connect();

const recipes = new RecipeRepository();

// recipes
//   .add({
//     name: "Test",
//     description: "Test",
//     picture: "test",
//     customFields: {},
//     ingredients: [],
//     instructions: [],
//     tags: [],
//   })
//   .then((recipe) => {
//     console.log(recipe);
//   });

// recipes.get("24ddaba2-5ee0-4388-bf88-e0f75d66e915");

recipes.getMultiple({ limit: 10, search: "no" }).then((recipes) => {
  console.log(recipes);
});

dotenv.config();

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

fastify.register(import("./routes/home"), { prefix: "/home" });

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000;

fastify.listen({ port }, (err, address) => {
  if (err) throw err;
});
