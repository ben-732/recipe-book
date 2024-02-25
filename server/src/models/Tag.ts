import { Type, Static } from "@sinclair/typebox";
import { BaseEntity } from "./BaseEntity";

const TagSchema = Type.Object({
  name: Type.String(),
  icon: Type.String(),
  color: Type.String(),
});

export type TagType = Static<typeof TagSchema>;

export class Tag extends BaseEntity implements Static<typeof TagSchema> {
  static readonly Schema = Type.Composite([TagSchema, BaseEntity.Schema], {
    $id: "Tag",
  });

  name: string;
  icon: string;
  color: string;

  constructor(from: TagType & BaseEntity) {
    super(from);

    this.name = from.name;
    this.icon = from.icon;
    this.color = from.color;
  }
}
