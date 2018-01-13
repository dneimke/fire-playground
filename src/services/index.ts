import { FlatCollectionService } from "./flat-collection.service";
import { NestedCollectionService } from "./nested-collection.service";
import { FireCollectionService } from "./fire-collection.service";
import { UserService } from "./user.service";

export const services: any[] = [
  FireCollectionService,
  FlatCollectionService,
  NestedCollectionService,
  UserService
];

export * from "./flat-collection.service";
export * from "./nested-collection.service";
export * from "./ICollection.service";
export * from "./user.service";
export * from "./fire-collection.service";
