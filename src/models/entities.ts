import { IBaseEntity } from "./base-entity";

export class Cart implements IBaseEntity {
  id: string;
  name: string;
  userId: string;
  items: { [key: string]: Item[] }; // items are grouped by category
}

export class Item {
  name: string;
  type: string;
  categoryId?: string;
  tags?: Tag[];
}

export class Category {
  id: string;
  name: string;
}

export class Tag {
  id: string;
  name: string;
}
