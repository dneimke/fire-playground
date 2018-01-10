import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "@firebase/auth-types";
import { Cart } from "../models";
import { ICollectionService } from ".";
import { fromPromise } from "rxjs/observable/fromPromise";

@Injectable()
export class FlatCollectionService implements ICollectionService<Cart> {
  path: string = "carts";
  items$: AngularFirestoreCollection<Cart>;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.items$ = db.collection(this.path);
  }

  find(id: string): Observable<Cart> {
    return this.items$.doc(id).ref;
  }

  findAll(): Observable<Cart[]> {
    const observer$ = new Subject<string>();

    const query$ = observer$.switchMap(userId => {
      return null;
    }) as Observable<Cart[]>;

    this.auth.authState.subscribe((user: User) => {
      observer$.next(user.uid);
    });

    return query$;
  }

  add(cart: Cart): Observable<Cart> {
    const observer = new Subject<Cart>();

    const promise = this.items$.add(cart).then(docRefPromise => {
      const newItem = { id: docRefPromise.id, ...cart };
      var docRef = this.items$.doc(newItem.id);
      docRef.set(newItem);
      observer.next(newItem);
    });

    return observer.asObservable();
  }

  update(cart: Cart): Observable<Cart> {
    const id = cart.id;
    var docRef = this.items$.doc(id);
    docRef.set(cart);

    let o = docRef.snapshotChanges().map(doc => {
      return doc.payload.data() as Cart;
    });

    return o;
  }

  delete(id: string): Observable<boolean> {
    let docRef = this.items$.doc(id);

    const promise = docRef.delete().then(() => {
      return true;
    });

    return fromPromise(promise);
  }
}
