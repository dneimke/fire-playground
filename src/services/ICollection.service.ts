import { Observable } from "rxjs/Observable";

export interface ICollectionService<T> {
  find(id: string): Observable<T>;

  findAll(): Observable<T[]>;

  add(item: T); // : Observable<T>;

  update(item: T); // : Observable<T>;

  delete(id: string); // : Observable<boolean>;
}
