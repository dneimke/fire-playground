import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { NestedCollectionService, UserService } from "../../services";
import { Cart, User } from "../../models";

@Component({
  selector: "home",
  templateUrl: "./nested-collections.component.html"
})
export class NestedCollectionsComponent implements OnInit {
  carts$: Observable<Cart[]>;
  user: User;
  constructor(
    private collectionService: NestedCollectionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.carts$ = this.collectionService.findAll();

    this.userService.getUser().subscribe(e => (this.user = e));
  }

  onAddCart() {
    const name = prompt("Enter a name for your cart.");
    const cart = { name } as Cart;
    this.collectionService.add(cart);
  }
}
