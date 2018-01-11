import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AngularFirestore } from "angularfire2/firestore";
import { Cart, User } from "../models";
import { of } from "rxjs/observable/of";
import { fromPromise } from "rxjs/observable/fromPromise";
import { ICollectionService } from "./ICollection.service";
import { UserService } from "./user.service";

@Injectable()
export class NestedCollectionService implements ICollectionService<Cart> {
  constructor(private afs: AngularFirestore, private userService: UserService) {}

  find(id: string): Observable<Cart> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap((userId: string) => {
      const path = `accounts/${userId}/carts/${id}`;
      const docRef = this.afs.doc<Cart>(path);
      if (docRef) {
        return docRef.ref;
      }

      return null;
    }) as Observable<Cart>;

    this.userService.getUser().subscribe((user: User) => {
      items$.next(user.id);
    });

    return query$;
  }

  findAll(): Observable<Cart[]> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap(userId => {
      const path = `accounts/${userId}/carts`;
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
    }) as Observable<Cart[]>;

    this.userService.getUser().subscribe((user: User) => {
      items$.next(user.id);
    });

    return query$;
  }

  add(cart: Cart): Observable<Cart> {
    const subject$ = new Subject<Cart>();

    this.userService.getUser().subscribe((user: User) => {
      const path = `accounts/${user.id}/carts`;
      console.info(path);

      const coll$ = this.afs.collection<Cart>(path);
      coll$.add(cart).then(() => {
        subject$.next(cart);
      });
    });

    return subject$.asObservable();
  }

  update(cart: Cart): Observable<Cart> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap(userId => {
      const path = `accounts/${userId}/carts/${cart.id}`;
      const docRef = this.afs.doc<Cart>(path);
      if (docRef) {
        docRef.set(cart);
        return docRef.ref;
      }

      return null;
    }) as Observable<Cart>;

    this.userService.getUser().subscribe((user: User) => {
      items$.next(user.id);
    });

    return query$;
  }

  delete(cartId: string): Observable<boolean> {
    const items$ = new Subject<string>();

    const query$ = items$.switchMap(userId => {
      const path = `accounts/${userId}/carts/${cartId}`;
      const docRef = this.afs.doc<Cart>(path);
      if (docRef) {
        docRef.delete();
        return of(true);
      }

      return of(false);
    }) as Observable<boolean>;

    this.userService.getUser().subscribe((user: User) => {
      items$.next(user.id);
    });

    return query$;
  }
}
