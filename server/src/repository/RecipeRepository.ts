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
    IRepository<
      Recipe,
      RecipeSummary,
      Static<typeof Recipe.FieldsSchema>,
      Static<typeof FilterSchema>
    >
{
  /**
   * Get a single recipe by id
   *
   * @param id Id of the recipe to get
   * @returns Specified Recipe
   */
  async get(id: string): Promise<Recipe | undefined> {
    //postgres
    const query: QueryConfig = {
      // text: "SELECT recipes.*, tags.name as tag_name, tags.color as tag_color, tags.id as tag_id, tags.icon FROM recipes JOIN recipe_tags ON recipes.id = recipe_tags.recipe_id INNER JOIN tags ON recipe_tags.tag_id = tags.id WHERE recipes.id = $1",
      text: `
        SELECT recipes.*, json_agg(to_json(t)) as tags 
        FROM recipes 
          JOIN recipe_tags on recipes.id = recipe_tags.recipe_id 
          JOIN (select id, color, icon, name from tags) as t on recipe_tags.tag_id = t.id 
        WHERE recipes.id = $1 AND deleted_at IS NULL GROUP BY recipes.id`,

      name: "get-recipe-by-id",
      values: [id],
    };

    try {
      const req = await Database.query(query);

      if (req.length < 1) {
        return undefined;
      }
      console.log(req);

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
      text: `SELECT recipes.id, recipes.name, recipes.description, recipes.picture,
            '0' as ingredients_count, '0' as steps_count, json_agg(to_json(t)) as tags
            FROM recipes
              join recipe_tags on recipes.id = recipe_tags.recipe_id
              join (select id, color, icon, name from tags) as t on recipe_tags.tag_id = t.id
            WHERE deleted_at IS NULL`,
      values: [],
    };

    if (filter.search) {
      query.text += ` AND name ILIKE $${valueCount} OR description ILIKE $${valueCount++}`;
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

    query.text += ` GROUP BY recipes.id`;

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

      return new Recipe(res[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: string): Promise<void> {
    const query: QueryConfig = {
      text: "UPDATE recipes SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL",
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
