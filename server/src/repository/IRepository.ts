import { BaseEntity } from "../models/BaseEntity";

export interface IRepository<
  Entity extends BaseEntity,
  SummaryEntity,
  CommandEntity
> {
  add(item: CommandEntity): Promise<Entity>;
  update(item: CommandEntity): Promise<Entity>;
  delete(id: string): Promise<boolean>;
  get(id: string): Promise<Entity | undefined>;
  getMultiple(): Promise<SummaryEntity[]>;
}
