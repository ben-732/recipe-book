import { IRecipeFields, Recipe, RecipeSummary } from "../models/Recipe";
import { IRepository } from "./IRepository";

import { Database } from "../interface/database";
import { QueryConfig, CustomTypesConfig } from "pg";
import { randomUUID } from "crypto";

const CURRENT_USER_ID = "24ddaba2-5ee0-4388-bf88-e0f75d66e915";

export class RecipeRepository
  implements IRepository<Recipe, RecipeSummary, IRecipeFields>
{
  /**
   * Get a single recipe by id
   *
   * @param id Id of the recipe to get
   * @returns Specified Recipe
   */
  async get(id: string): Promise<Recipe> {
    const query: QueryConfig = {
      text: "SELECT * FROM recipes WHERE id = $1",
      name: "get-recipe-by-id",
      values: [id],
    };

    try {
      const req = await Database.query(query);

      if (req.length < 1) {
        return Promise.reject("No recipe found");
      }

      const recipe = new Recipe(req[0]);

      return recipe;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getMultiple(): Promise<RecipeSummary[]> {
    throw new Error("Method not implemented.");
  }

  async add(item: IRecipeFields): Promise<Recipe> {
    console.log(item);

    const query: QueryConfig = {
      text: "INSERT INTO recipes (id, name, picture, description, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      name: "add-recipe",
      values: [
        randomUUID(),
        item.name,
        item.picture,
        item.description,
        CURRENT_USER_ID,
      ],
    };

    try {
      const res = await Database.query(query);

      console.log(res);

      return new Recipe(res[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  update(item: IRecipeFields): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
