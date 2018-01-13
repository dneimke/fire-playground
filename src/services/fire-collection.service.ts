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
import { ICollectionService } from "./ICollection.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Subject } from "rxjs/Subject";

@Injectable()
export class FireCollectionService implements ICollectionService<Cart> {
  itemsCollection: AngularFirestoreCollection<Cart>;
  items: Observable<Cart[]>;
  itemDoc: AngularFirestoreDocument<Cart>;
  private userId: string;

  constructor(private afs: AngularFirestore) {}

  find(id: string): Observable<Cart> {
    const path = `carts/${id}`;
    console.info(`find: `, path);

    return this.afs
      .doc<Cart>(path)
      .snapshotChanges()
      .map((action: DocumentChangeAction) => {
        if (action.payload.exists) {
          const data = action.payload.data() as Cart;
          const id = action.payload.id;
          return { id, ...data };
        }
      });
  }

  findByUser(userId: string): Observable<Cart[]> {
    this.userId = userId;
    this.itemsCollection = this.afs.collection("carts", ref => ref.orderBy("name", "asc"));

    return (this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Cart;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  add(cart: Cart): void {
    this.itemsCollection.add(cart).then(ref => {
      const newItem = { id: ref.id, ...cart };
      ref.set(newItem);
    });
  }

  update(cart: Cart) {
    const docRef = this.afs.doc<Cart>(`carts/${cart.id}`);
    docRef.update(cart);
  }

  delete(cartId: string): void {
    const docRef = this.afs.doc<Cart>(`carts/${cartId}`);
    docRef.delete();
  }
}
