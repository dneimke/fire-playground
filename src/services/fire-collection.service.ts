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
    const path = `carts`;
    console.info(`findByUser`, path);

    return this.afs
      .collection<Cart>(path, ref => ref.where("userId", "==", userId))
      .snapshotChanges()
      .map((actions: DocumentChangeAction[]) => {
        return actions.map((action: DocumentChangeAction) => {
          if (action.payload.doc.exists) {
            const data = action.payload.doc.data() as Cart;
            const id = action.payload.doc.id;
            return { id, ...data };
          } else {
            console.info("skipping: ", action.payload.doc);
          }
        });
      });
  }

  add(cart: Cart): void {
    const path = `carts`;
    console.info(`adding: `, path, cart);

    this.afs
      .collection<Cart>(path)
      .add(cart)
      .then(ref => {
        const newItem = { id: ref.id, ...cart };
        ref.set(newItem);
      });
  }

  update(cart: Cart) {
    const path = `carts/${cart.id}`;
    const docRef = this.afs.doc<Cart>(path);
    if (docRef) {
      console.info(`updating: `, docRef, cart);
      docRef.set(cart);
    }
  }

  delete(cartId: string): void {
    const path = `carts/${cartId}`;
    console.info(`deleting: `, path);
    const docRef = this.afs.doc<Cart>(path).delete();
  }
}
