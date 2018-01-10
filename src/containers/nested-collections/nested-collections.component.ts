import { Component } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "home",
  templateUrl: "./nested-collections.component.html"
})
export class NestedCollectionsComponent {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection("nested-items").valueChanges();
  }
}
