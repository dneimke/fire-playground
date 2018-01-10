import { FlatCollectionService } from "./flat-collection.service";
import { NestedCollectionService } from "./nested-collection.service";

export const services: any[] = [FlatCollectionService, NestedCollectionService];

export * from "./flat-collection.service";
export * from "./nested-collection.service";
export * from "./ICollection.service";
