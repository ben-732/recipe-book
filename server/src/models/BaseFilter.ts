import { Type } from "@sinclair/typebox";

export const FilterSchema = Type.Object(
  {
    offset: Type.Optional(Type.Number()),
    limit: Type.Optional(Type.Number()),
    search: Type.Optional(Type.String()),
    orderBy: Type.Optional(Type.String()),
  },
  {
    $id: "BaseFilter",
    title: "Base Filter",
    description: "Base filter for when getting list of entities",
  }
);
