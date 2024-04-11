import { Static, Type } from "@sinclair/typebox";
import { Recipe } from "./Recipe";
import { TagSummary } from "./Tag";

const RecipeSummarySchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    description: Type.String(),
    picture: Type.String(),
    ingredientsCount: Type.Number(),
    stepsCount: Type.Number(),
    tags: Type.Array(TagSummary.Schema),
  },
  { $id: "RecipeSummary" }
);

export class RecipeSummary implements Static<typeof RecipeSummarySchema> {
  static readonly Schema = RecipeSummarySchema;

  id: string;
  name: string;
  description: string;
  picture: string;
  ingredientsCount: number;
  stepsCount: number;
  tags: TagSummary[];

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
