import { BaseEntity } from "../models/BaseEntity";

export interface IRepository<
  Entity extends BaseEntity,
  SummaryEntity,
  CommandEntity,
  Filter
> {
  add(item: CommandEntity): Promise<Entity>;
  update(item: CommandEntity): Promise<Entity>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<Entity | undefined>;
  getMultiple(filter: Filter): Promise<SummaryEntity[]>;
}
