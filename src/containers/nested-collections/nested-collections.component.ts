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
  items$: Observable<Cart[]>;
  user$: Observable<User>;
  constructor(
    private collectionService: NestedCollectionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
    this.items$ = this.collectionService.findAll();
  }

  onAddCart() {
    const name = prompt("Enter a name for your cart.");

    const cart = { name } as Cart;

    this.collectionService.add(cart);
  }
}
