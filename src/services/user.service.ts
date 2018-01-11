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

    const userId = "1";
    let path = `${this.path}/${userId}`;

    this.ensureTestUser(userId).then(() => {
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
    });

    return result$.asObservable();
  }

  ensureTestUser(userId: string): Promise<{}> {
    const result$ = new Subject<{}>();

    const testUser = { id: userId, name: "Test User" };

    this.af
      .doc<User>(`${this.path}/${testUser.id}`)
      .snapshotChanges()
      .subscribe((e: DocumentChangeAction) => {
        if (!e.payload.exists) {
          this.af
            .collection(this.path)
            .doc(testUser.id)
            .set(testUser)
            .then(() => result$.complete());
        } else {
          result$.complete();
        }
      });

    return result$.toPromise();
  }
}
