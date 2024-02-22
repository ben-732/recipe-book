import { Static, Type } from "@sinclair/typebox";
import { BaseEntity, BaseEntitySchema } from "./BaseEntity";
import { RecipeSummary } from "./RecipeSummary";
import { randomUUID } from "crypto";

const RecipeSchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  source: Type.String(),
  picture: Type.String(),
  customFields: Type.Record(Type.String(), Type.String()),
  ingredients: Type.Array(Type.String()),
  instructions: Type.Array(Type.String()),
  tags: Type.Array(Type.String()),
});

export type RecipeType = Static<typeof RecipeSchema>;

export class Recipe extends BaseEntity implements Static<typeof RecipeSchema> {
  static readonly Schema = Type.Composite([BaseEntitySchema, RecipeSchema], {
    $id: "Recipe",
    title: "Recipe",
  });

  name: string;
  description: string;
  source: string;
  picture: string;
  customFields: Record<string, string>;
  ingredients: string[];
  instructions: string[];
  tags: string[];

  constructor(from: Static<typeof RecipeSchema> & BaseEntity) {
    super(from);

    this.description = from.description;
    this.name = from.name;
    this.picture = from.picture;
    this.source = from.source;
    this.customFields = from.customFields ?? {};
    this.ingredients = from.ingredients ?? [];
    this.instructions = from.instructions ?? [];
    this.tags = from.tags ?? [];
  }

  toSummary(): RecipeSummary {
    return new RecipeSummary(this);
  }
}
