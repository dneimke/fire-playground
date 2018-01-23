import { IBaseEntity } from "./base-entity";

export class BaseEntity implements IBaseEntity {
  id: string;
  name: string;
}

export class Cart extends BaseEntity {
  userId: string;
  items: { [key: string]: PurchasedProduct[] }; // items are grouped by category
}

export class Category extends BaseEntity {}

export class Product extends BaseEntity {
  categoryId?: string;
  unitPrice: number;
}

export class Tag extends BaseEntity {}

export class PurchasedProduct extends Product {
  quantity: number;
  totalPrice: number;
}
