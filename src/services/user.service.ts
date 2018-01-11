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
    const result$ = new Subject<User>();

    const user = { id: "1", name: "Test User" } as User;
    let path = `${this.path}/${user.id}`;

    this.ensureTestUser(user).then(() => {
      const data = this.af
        .doc(path)
        .snapshotChanges()
        .map(e => {
          return e.payload;
        });

      data.subscribe(d => {
        console.info("customer changed", d);
        result$.next(d.data());
      });

      // .snapshotChanges()
      // .map(e => result$.next(e.payload.ref));
    });

    return result$.asObservable();
  }

  ensureTestUser(user: User): Promise<{}> {
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
            .then(() => result$.complete());
        } else {
          result$.complete();
        }
      });

    return result$.toPromise();
  }
}
