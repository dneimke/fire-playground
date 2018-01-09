import { Component } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "home",
  template: `
  <ul>
    <li *ngFor="let item of items | async">
      {{ item.name }}
    </li>
  </ul>
  `
})
export class HomeComponent {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection("items").valueChanges();
  }
}
