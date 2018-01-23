import { Component } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { CartService } from "../services";

@Component({
  selector: "home",
  templateUrl: "./home-component.html"
})
export class HomeComponent {
  items: Observable<any[]>;
  constructor(private cartService: CartService) {}
}
