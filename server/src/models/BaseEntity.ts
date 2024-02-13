import { randomUUID } from "crypto";

interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string;
}

export abstract class BaseEntity implements IBaseEntity {
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
  constructor(from: IBaseEntity) {
    this.toCamelCase(from);

    console.log();

    this.id = from.id;
    this.createdAt = from.createdAt;
    this.updatedAt = from.updatedAt;
    this.deletedAt = from.deletedAt;
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
