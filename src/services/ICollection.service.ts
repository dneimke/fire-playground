import { Observable } from "rxjs/Observable";

export interface ICollectionService<T> {
  find(id: string): Observable<T>;

  findByUser(userId: string): Observable<T[]>;

  add(item: T): void;

  update(item: T): void;

  delete(id: string): void;
}
