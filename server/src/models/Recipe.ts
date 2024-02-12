import { BaseEntity } from "./BaseEntity";

export interface IRecipeFields {
  name: string;
  picture: string;
  customFields: Record<string, string>;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export class Recipe extends BaseEntity implements BaseEntity, IRecipeFields {
  name: string;
  picture: string;
  customFields: Record<string, string>;
  ingredients: string[];
  instructions: string[];
  tags: string[];

  constructor(from: IRecipeFields & BaseEntity) {
    super(from);

    this.tags = from.tags;
    this.name = from.name;
    this.picture = from.picture;
    this.customFields = from.customFields;
    this.ingredients = from.ingredients;
    this.instructions = from.instructions;
  }
}

export class RecipeSummary implements Partial<Recipe> {
  id: string;
  name: string;
  description: string;
  picture: string;
  ingredientsCount: number;
  stepsCount: number;
  tags: string[];

  constructor(recipe: Recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.description = recipe.customFields.description;
    this.picture = recipe.picture;
    this.tags = recipe.tags;
    this.ingredientsCount = recipe.ingredients.length;
    this.stepsCount = recipe.instructions.length;
  }
}
