import { Type, type Static } from "@sinclair/typebox";
import { randomUUID } from "crypto";

export const BaseEntitySchema = Type.Object({
  id: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
  deletedAt: Type.Union([Type.Null(), Type.String({ format: "date-time" })]),
  createdBy: Type.String(),
});

export interface BaseEntityFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string;
}

/**
 * Base entity with default values
 */
export abstract class BaseEntity implements BaseEntityFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string;

  /**
   *
   * Create new entity with default values if no id is provided
   *
   * @param from Entity to copy from
   */
  constructor(from: Static<typeof BaseEntitySchema> | BaseEntityFields) {
    this.toCamelCase(from);

    console.log();

    this.id = from.id;
    this.createdAt = new Date(from.createdAt);
    this.updatedAt = new Date(from.updatedAt);
    this.deletedAt = from.deletedAt !== null ? new Date(from.deletedAt) : null;
    this.createdBy = from.createdBy;
  }

  /**
   * Convert snake case variable names to camel case
   *
   * @param obj Object to mutate
   */
  private toCamelCase(obj: Record<string, any>) {
    const keys = Object.keys(obj);

    for (const key of keys) {
      const newKey = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace("-", "").replace("_", "")
      );

      obj[newKey] = obj[key];
    }
  }
}
