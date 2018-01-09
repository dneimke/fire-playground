import { Component } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "home",
  template: `
  <h2>Simple collection bind</h2>
  <p>This page simply binds the Observable result of a collection to an unordered list</p>
  <ul>
    <li *ngFor="let item of items | async">
      {{ item.name }}
    </li>
  </ul>
  
  <pre>
  export class HomeComponent {{
    items: Observable&lt;any[]>;
    constructor(db: AngularFirestore) {{
      this.items = db.collection("items").valueChanges();
    }
  }
  </pre>
  
  `
})
export class HomeComponent {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection("items").valueChanges();
  }
}
