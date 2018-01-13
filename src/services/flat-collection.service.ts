import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFirestore, DocumentChangeAction } from "angularfire2/firestore";
import { Cart, User } from "../models";
import { of } from "rxjs/observable/of";
import { ICollectionService } from "./ICollection.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Subject } from "rxjs/Subject";

@Injectable()
export class FlatCollectionService implements ICollectionService<Cart> {
  userId: string;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    console.info(`ctor...`);
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.info(`we have a user...`);
      }
    });
  }

  find(id: string): Observable<Cart> {
    if (!this.userId) return;

    const path = `carts/${this.userId}/carts/${id}`;
    console.info(`find: `, path);

    return this.afs
      .doc(path)
      .snapshotChanges()
      .map((action: DocumentChangeAction) => {
        if (action.payload.exists) {
          const data = action.payload.data() as Cart;
          const id = action.payload.id;
          return { id, ...data };
        }
      })
      .filter(e => e !== null);
  }

  findByUser(userId: string): Observable<Cart[]> {
    const path = `accounts/${userId}/carts`;
    console.info(`findAll`, path);

    return this.afs
      .collection<Cart>(path)
      .snapshotChanges()
      .map(actions => {
        return actions
          .map((action: DocumentChangeAction) => {
            if (action.payload.doc.exists) {
              const data = action.payload.doc.data() as Cart;
              const id = action.payload.doc.id;
              return { id, ...data };
            } else {
              console.info("skipping: ", action.payload.doc);
            }
          })
          .filter(e => e !== null);
      });
  }

  add(cart: Cart): void {
    if (!this.userId) return;

    const path = `carts`;
    console.info(`adding: `, path, cart);

    this.afs.collection<Cart>(path).add(cart);
  }

  update(cart: Cart) {
    if (!this.userId) return of(null);

    const path = `carts/${cart.id}`;
    const docRef = this.afs.doc<Cart>(path);
    if (docRef) {
      console.info(`updating: `, docRef, cart);
      docRef.set(cart);
    }
  }

  delete(cartId: string): void {
    if (!this.userId) return;

    const path = `carts/${cartId}`;
    console.info(`deleting: `, path);
    const docRef = this.afs.doc<Cart>(path).delete();
  }
}
