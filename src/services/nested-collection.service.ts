import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "@firebase/auth-types";
import { Cart } from "../models";
import { of } from "rxjs/observable/of";
import { fromPromise } from "rxjs/observable/fromPromise";
import { ICollectionService } from ".";

@Injectable()
export class NestedCollectionService implements ICollectionService<Cart> {
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}

  find(id: string): Observable<Cart> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap((userId: string) => {
      const path = `users/${userId}/carts/${id}`;
      const docRef = this.db.doc<Cart>(path);
      if (docRef) {
        return docRef.ref;
      }

      return null;
    }) as Observable<Cart>;

    this.auth.authState.subscribe((user: User) => {
      items$.next(user.uid);
    });

    return query$;
  }

  findAll(): Observable<Cart[]> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap(userId => {
      const path = `users/${userId}/carts`;
      return this.db.collection(path).valueChanges();
    }) as Observable<Cart[]>;

    this.auth.authState.subscribe((user: User) => {
      items$.next(user.uid);
    });

    return query$;
  }

  add(cart: Cart): Observable<Cart> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap(userId => {
      const path = `users/${userId}/carts`;
      const collection = this.db.collection<Cart>(path);

      return fromPromise(collection.add(cart));
    }) as Observable<Cart>;

    this.auth.authState.subscribe((user: User) => {
      items$.next(user.uid);
    });

    return query$;
  }

  update(cart: Cart): Observable<Cart> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap(userId => {
      const path = `users/${userId}/carts/${cart.id}`;
      const docRef = this.db.doc<Cart>(path);
      if (docRef) {
        docRef.set(cart);
        return docRef.ref;
      }

      return null;
    }) as Observable<Cart>;

    this.auth.authState.subscribe((user: User) => {
      items$.next(user.uid);
    });

    return query$;
  }

  delete(cartId: string): Observable<boolean> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap(userId => {
      const path = `users/${userId}/carts/${cartId}`;
      const docRef = this.db.doc<Cart>(path);
      if (docRef) {
        docRef.delete();
        return of(true);
      }

      return of(false);
    }) as Observable<boolean>;

    this.auth.authState.subscribe((user: User) => {
      items$.next(user.uid);
    });

    return query$;
  }
}
