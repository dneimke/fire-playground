import { Observable } from "rxjs/Observable";

export interface IBaseService<T> {
  get(id: string): Observable<T>;

  list(): Observable<T[]>;

  add(item: T): Observable<T>;

  update(item: T): Observable<T>;

  delete(id: string): void;
}
