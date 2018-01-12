import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Cart } from "../../models";
import { NestedCollectionService } from "../../services";
import { User } from "@firebase/auth-types";
import { AngularFireAuth } from "angularfire2/auth";
import { of } from "rxjs/observable/of";

@Component({
  selector: "home",
  templateUrl: "./nested-collections.component.html"
})
export class NestedCollectionsComponent implements OnInit {
  carts$: Observable<Cart[]>;
  user$: Observable<User>;
  selectedCart: Cart;

  constructor(private cartService: NestedCollectionService, private authService: AngularFireAuth) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.carts$ = this.cartService.findAll();
      }
    });
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
    const name = prompt("Update the name of your cart.", cart.name);
    const updatedCart = { ...cart, name } as Cart;
    this.cartService.update(updatedCart).subscribe(() => {
      this.selectedCart = undefined;
    });
  }

  onDelete(cart: Cart) {
    console.info("onDelete", cart);
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      this.cartService.delete(cart.id).pipe(() => (this.selectedCart = undefined));
    }
  }
}
