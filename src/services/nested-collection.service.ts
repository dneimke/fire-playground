import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AngularFirestore } from "angularfire2/firestore";
import { Cart, User } from "../models";
import { of } from "rxjs/observable/of";
import { fromPromise } from "rxjs/observable/fromPromise";
import { ICollectionService } from "./ICollection.service";
import { UserService } from "./user.service";
import { DocumentSnapshot } from "@firebase/firestore-types";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class NestedCollectionService implements ICollectionService<Cart> {
  userId: string;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    console.info(`ctor...`);
    afAuth.authState.subscribe(user => {
      console.info(`callback...`);
      if (user) {
        console.info(`we have a user...`);
        this.userId = user.uid;
      }
    });
  }

  find(id: string): Observable<Cart> {
    if (!this.userId) return;

    console.info(`find()...`);

    const path = `accounts/${this.userId}/carts/${id}`;
    return this.afs
      .doc(path)
      .snapshotChanges()
      .map(e => {
        console.info(e.payload);
        return e.payload;
      });
  }

  findAll(): Observable<Cart[]> {
    if (!this.userId) return;

    console.info(`findAll()...`);

    const path = `accounts/${this.userId}/carts`;
    return this.afs
      .collection(path)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Cart;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  add(cart: Cart): Observable<Cart> {
    if (!this.userId) return;

    console.info(`add()...`);

    const path = `accounts/${this.userId}/carts`;
    this.afs
      .collection<Cart>(path)
      .add(cart)
      .then(() => {
        return cart;
      });
  }

  update(cart: Cart): Observable<Cart> {
    if (!this.userId) return;

    console.info(`update()...`);

    const path = `accounts/${this.userId}/carts/${cart.id}`;
    const docRef = this.afs.doc<Cart>(path);
    if (docRef) {
      docRef.set(cart);
      return docRef.ref;
    }

    return null;
  }

  delete(cartId: string): Observable<boolean> {
    if (!this.userId) return;

    console.info(`delete()...`);

    const path = `accounts/${this.userId}/carts/${cartId}`;
    const docRef = this.afs.doc<Cart>(path);
    if (docRef) {
      docRef.delete();
      return of(true);
    }

    return of(false);
  }
}
