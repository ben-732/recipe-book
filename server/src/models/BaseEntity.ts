interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: string;
}

export abstract class BaseEntity implements IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: string;

  constructor(from: IBaseEntity) {
    this.id = from.id;
    this.createdAt = from.createdAt;
    this.updatedAt = from.updatedAt;
    this.deletedAt = from.deletedAt;
    this.createdBy = from.createdBy;
  }
}
