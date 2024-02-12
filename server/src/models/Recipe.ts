export class Recipe {
  id: string;
  name: string;
  picture: string;
  customFields: Record<string, string>;
  ingredients: string[];
  instructions: string[];

  constructor(
    id: string,
    name: string,
    picture: string,
    customFields: Record<string, string>,
    ingredients: string[],
    instructions: string[]
  ) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.customFields = customFields;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}
