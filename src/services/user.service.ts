import { of } from "rxjs/observable/of";
import { User } from "@firebase/auth-types";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction } from "angularfire2/firestore";
import { Subject } from "rxjs/Subject";
// import { FirebaseFirestore } from "@firebase/firestore-types";
import { fromPromise } from "rxjs/observable/fromPromise";
import { AngularFireAuth } from "angularfire2/auth";
import { firebase } from "@firebase/app";
import { Router } from "@angular/router";

/*
    This class is a mock version of the Auth provider in Firebase
*/
@Injectable()
export class UserService {
  public user$: Observable<User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => {
        this.router.navigate([`/home`]);
      })
      .catch(error => console.info("auth error", error));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([`/home`]);
  }
}
