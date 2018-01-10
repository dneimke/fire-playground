import { User } from "../models";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

/*
    This class is a mock version of the Auth provider in Firebase
*/
@Injectable()
export class UserService {
  constructor() {}
  getUser(): Observable<User> {
    return of({ id: "1", name: "Test User" });
  }

  ensureTestUser() {}
}
