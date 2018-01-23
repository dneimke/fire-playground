import { Observable } from "rxjs/Observable";
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { Subject } from "rxjs/Subject";
import { IBaseEntity } from "../models";

export interface IBaseService<T> {
  get(id: string): Observable<T>;

  list(): Observable<T[]>;

  add(item: T): Observable<T>;

  update(item: T): Observable<T>;

  delete(id: string): void;
}

export class BaseService<T extends IBaseEntity> implements IBaseService<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected uri: string, protected afs: AngularFirestore) {
    this.collection = this.afs.collection(this.uri);
  }

  get(id: string): Observable<T> {
    console.info("[BaseService] get: ", id);
    return this.collection
      .doc<T>(id)
      .snapshotChanges()
      .map(action => {
        if (action.payload.exists) {
          const data = action.payload.data();
          const id = action.payload.id;
          return { id, ...data };
        }
      });
  }

  list(): Observable<T[]> {
    console.info("[BaseService] list");
    return this.collection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  add(item: T): Observable<T> {
    const subject = new Subject<T>();

    console.info("[BaseService] adding: ", item);
    this.collection.add(item).then(ref => {
      const newItem = {
        id: ref.id,
        ...(item as any) /* workaround until spreads work with generic types */
      };
      ref.set(newItem);
      subject.next(newItem);
    });

    return subject.asObservable();
  }

  update(item: T): Observable<T> {
    let subject = new Subject<T>();

    console.info("[BaseService] updating: ", item);
    const docRef = this.collection
      .doc<T>(item.id)
      .set(item)
      .then(() => subject.next(item));

    return subject.asObservable();
  }

  delete(id: string): void {
    console.info("[BaseService] deleting: ", id);

    const docRef = this.collection.doc<T>(id);
    docRef.delete();
  }
}
