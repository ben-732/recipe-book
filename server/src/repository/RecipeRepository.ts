import { Recipe, RecipeType } from "../models/Recipe";
import { IRepository } from "./IRepository";

import { Database } from "../interface/database";
import { QueryConfig, CustomTypesConfig } from "pg";
import { randomUUID } from "crypto";
import { FilterSchema } from "../models/BaseFilter";
import { RecipeSummary } from "../models/RecipeSummary";
import { Static } from "@sinclair/typebox";

const CURRENT_USER_ID = "24ddaba2-5ee0-4388-bf88-e0f75d66e915";

export class RecipeRepository
  implements
    IRepository<Recipe, RecipeSummary, RecipeType, Static<typeof FilterSchema>>
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
        return undefined;
      }

      const recipe = new Recipe(req[0]);

      return recipe;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get multiple recipes
   */
  async getMultiple(
    filter: Static<typeof FilterSchema>
  ): Promise<RecipeSummary[]> {
    let valueCount = 1;

    const query: QueryConfig = {
      text: "SELECT * FROM recipes",
      values: [],
    };

    if (filter.search) {
      query.text += ` WHERE name ILIKE $${valueCount} OR description ILIKE $${valueCount++}`;
      query.values!.push(`%${filter.search}%`);
    }

    if (filter.limit) {
      query.text += ` LIMIT $${valueCount++}`;
      query.values!.push(filter.limit);
    }

    if (filter.offset) {
      query.text += ` OFFSET $${valueCount++}`;
      query.values!.push(filter.offset);
    }

    try {
      const req = await Database.query(query);

      return req.map((recipe) => new Recipe(recipe).toSummary());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async add(item: RecipeType): Promise<Recipe> {
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

  async delete(id: string): Promise<void> {
    const query: QueryConfig = {
      text: "UPDATE FROM recipes WHERE id = $1 SET deleted_at = NOW()",
      name: "delete-recipe",
      values: [id],
    };
    try {
      await Database.query(query);

      return;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  update(item: RecipeType): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
