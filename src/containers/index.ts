import { HomeComponent } from "./home-component";
import { NestedCollectionsComponent } from "./nested-collections";
import { FlatCollectionsComponent } from "./flat-collection";
import { FireCollectionsComponent } from "./fire-collection";

export const containers: any[] = [
  HomeComponent,
  NestedCollectionsComponent,
  FlatCollectionsComponent,
  FireCollectionsComponent
];

export * from "./home-component";
export * from "./nested-collections";
export * from "./flat-collection";
export * from "./fire-collection";
