import { BaseEntity } from "./BaseEntity";

export interface IRecipeFields {
  name: string;
  description: string;
  picture: string;
  customFields: Record<string, string>;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export class Recipe extends BaseEntity implements IRecipeFields {
  name: string;
  description: string;
  picture: string;
  customFields: Record<string, string>;
  ingredients: string[];
  instructions: string[];
  tags: string[];

  constructor(from: IRecipeFields & BaseEntity) {
    super(from);

    this.tags = from.tags;
    this.description = from.description;
    this.name = from.name;
    this.picture = from.picture;
    this.customFields = from.customFields;
    this.ingredients = from.ingredients;
    this.instructions = from.instructions;
  }

  toSummary(): RecipeSummary {
    return new RecipeSummary(this);
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
    this.description = recipe.description;
    this.picture = recipe.picture;
    this.tags = recipe.tags;

    this.ingredientsCount = recipe.ingredients?.length ?? 0;
    this.stepsCount = recipe.instructions?.length ?? 0;
  }
}
