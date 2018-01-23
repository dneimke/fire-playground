export class Cart {
  id?: string;
  name: string;
  userId: string;
  items: { [key: string]: Item[] };
}

export class Item {
  name: string;
  type: string;
}
