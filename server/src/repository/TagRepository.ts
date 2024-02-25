import { IRepository } from "./IRepository";
import { Database } from "../interface/database";
import { QueryConfig } from "pg";
import { randomUUID } from "crypto";
import { FilterSchema } from "../models/BaseFilter";
import { Static } from "@sinclair/typebox";
import { Tag, TagType } from "../models/Tag";

const CURRENT_USER_ID = "24ddaba2-5ee0-4388-bf88-e0f75d66e915";

export class TagRepository
  implements IRepository<Tag, Tag, TagType, Static<typeof FilterSchema>>
{
  /**
   * Get a single tag by id
   *
   * @param id Id of the tag to get
   * @returns Specified Tag
   */
  async get(id: string): Promise<Tag | undefined> {
    const query: QueryConfig = {
      text: "SELECT tags.* FROM tags WHERE tags.id = $1",
      name: "get-tag-by-id",
      values: [id],
    };

    try {
      const req = await Database.query(query);

      if (req.length < 1) {
        return undefined;
      }

      const tag = new Tag(req[0]);

      return tag;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get multiple tag
   */
  async getMultiple(filter: Static<typeof FilterSchema>): Promise<Tag[]> {
    let valueCount = 1;

    const query: QueryConfig = {
      text: "SELECT * FROM tags",
      values: [],
    };

    if (filter.search) {
      query.text += ` WHERE name ILIKE $${valueCount++}`;
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

    try {
      const req = await Database.query(query);

      return req.map((tag) => new Tag(tag));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async add(item: TagType): Promise<Tag> {
    console.log(item);

    const query: QueryConfig = {
      text: "INSERT INTO tags (id, name, icon, color, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      name: "add-tag",
      values: [randomUUID(), item.name, item.icon, item.color, CURRENT_USER_ID],
    };

    try {
      const res = await Database.query(query);

      return new Tag(res[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: string): Promise<void> {
    const query: QueryConfig = {
      text: "UPDATE FROM tags WHERE id = $1 SET deleted_at = NOW()",
      name: "delete-tag",
      values: [id],
    };
    try {
      await Database.query(query);

      return;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  update(item: TagType): Promise<Tag> {
    throw new Error("Method not implemented.");
  }
}
