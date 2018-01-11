import { User } from "../models";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction } from "angularfire2/firestore";
import { Subject } from "rxjs/Subject";
// import { FirebaseFirestore } from "@firebase/firestore-types";
import { fromPromise } from "rxjs/observable/fromPromise";

/*
    This class is a mock version of the Auth provider in Firebase
*/
@Injectable()
export class UserService {
  private path = "accounts";

  constructor(private af: AngularFirestore) {}

  getUser(): Observable<User> {
    const user = { id: "1", name: "Test User" } as User;
    let path = `${this.path}/${user.id}`;

    return this.ensureTestUser(user).switchMap(() => {
      return this.af
        .doc<User>(path)
        .snapshotChanges()
        .map(e => e.payload.data());
    });
  }

  ensureTestUser(user: User): Observable<{}> {
    const result$ = new Subject<{}>();

    this.af
      .doc<User>(`${this.path}/${user.id}`)
      .snapshotChanges()
      .subscribe((e: DocumentChangeAction) => {
        if (!e.payload.exists) {
          this.af
            .collection(this.path)
            .doc(user.id)
            .set(user)
            .then(() => result$.next());
        } else {
          result$.next();
        }
      });
    // .pipe(result => {
    //   if (!result.payload.docSnap().exists) {
    //     coll$
    //       .doc(user.id)
    //       .set(user)
    //       .then(() => result$.next());
    //   } else {
    //     result$.next();
    //   }
    // });

    return result$.asObservable();
  }
}
