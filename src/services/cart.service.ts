import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFirestore } from "angularfire2/firestore";
import { Cart, User } from "../models";
import { Subject } from "rxjs/Subject";
import { BaseService } from "./base.service";

@Injectable()
export class CartService extends BaseService<Cart> {
  constructor(afs: AngularFirestore) {
    super("carts", afs);
  }

  // Custom Methods

  getForUser(userId: string): Observable<Cart[]> {
    console.info("[CartService] getForUser: ", userId);
    let coll = this.afs.collection(this.uri, ref => ref.where("userId", "==", userId));

    return coll.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Cart;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
}
