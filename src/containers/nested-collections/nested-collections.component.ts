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
  selectedCart: Cart;

  constructor(private cartService: NestedCollectionService, private userService: UserService) {}

  ngOnInit(): void {
    this.carts$ = this.cartService.findAll();

    this.userService.getUser().subscribe(e => (this.user = e));
  }

  onAddCart() {
    const name = prompt("Enter a name for your cart.");
    const cart = { name } as Cart;
    this.cartService.add(cart);
  }

  onSelect(cartId: string) {
    this.cartService.find(cartId).subscribe(c => {
      console.info("selected", c);
      this.selectedCart = c;
    });
  }

  onEdit(cart: Cart) {
    // this.cartService.find(cartId).subscribe(c => (this.selectedCart = c));
  }

  onDelete(cart: Cart) {
    console.info(cart);
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      this.cartService.delete(cart.id).pipe(() => (this.selectedCart = undefined));
    }
  }
}
