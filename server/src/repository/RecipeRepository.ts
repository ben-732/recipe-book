import { IRecipeFields, Recipe, RecipeSummary } from "../models/Recipe";
import { IRepository } from "./IRepository";

import { Database } from "../interface/database";
import { QueryConfig, CustomTypesConfig } from "pg";

export class RecipeRepository
  implements IRepository<Recipe, RecipeSummary, IRecipeFields>
{
  /**
   * Get a single recipe by id
   *
   * @param id Id of the recipe to get
   * @returns Specified Recipe
   */
  async get(id: string): Promise<Recipe | undefined> {
    const query: QueryConfig = {
      text: "SELECT * FROM recipes WHERE id = $1",
      name: "get-recipe-by-id",
      values: [id],
    };

    try {
      const req = await Database.query(query);

      if (req.length < 1) {
        throw new Error("No recipe found");
      }

      const recipe = new Recipe(req[0]);

      return recipe;
    } catch (error) {
      Promise.reject(error);
    }
  }

  getMultiple(): Promise<RecipeSummary[]> {
    throw new Error("Method not implemented.");
  }

  add(item: IRecipeFields): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  update(item: IRecipeFields): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
