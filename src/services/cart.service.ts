import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Cart, User } from "../models";
import { of } from "rxjs/observable/of";
import { IBaseService } from "./base.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Subject } from "rxjs/Subject";

@Injectable()
export class CartService implements IBaseService<Cart> {
  uri = "carts";
  collection: AngularFirestoreCollection<Cart>;

  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection(this.uri);
  }

  get(id: string): Observable<Cart> {
    console.info("[CartService] get: ", id);
    return this.collection
      .doc<Cart>(id)
      .snapshotChanges()
      .map(action => {
        if (action.payload.exists) {
          const data = action.payload.data() as Cart;
          const id = action.payload.id;
          return { id, ...data };
        }
      });
  }

  list(): Observable<Cart[]> {
    console.info("[CartService] list");
    return this.collection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Cart;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  add(entity: Cart): Observable<Cart> {
    const subject = new Subject<Cart>();

    console.info("[CartService] adding: ", entity);
    this.collection.add(entity).then(ref => {
      const newItem = { id: ref.id, ...entity };
      ref.set(newItem);
      subject.next(newItem);
    });

    return subject.asObservable();
  }

  update(entity: Cart): Observable<Cart> {
    let subject = new Subject<Cart>();

    console.info("[CartService] updating: ", entity);
    const docRef = this.collection
      .doc<Cart>(entity.id)
      .set(entity)
      .then(() => subject.next(entity));

    return subject.asObservable();
  }

  delete(id: string): void {
    console.info("[CartService] deleting: ", id);

    const docRef = this.collection.doc<Cart>(id);
    docRef.delete();
  }

  // Custom Methods

  getForUser(userId: string): Observable<Cart[]> {
    console.info("[Match Service] getForUser: ", userId);
    let coll = this.afs.collection(this.uri, ref => ref.where("userId", "==", userId));

    return coll.snapshotChanges().map(changes => {
      console.info(changes);
      return changes.map(a => {
        const data = a.payload.doc.data() as Cart;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
}
