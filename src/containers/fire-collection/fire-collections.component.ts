import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Cart } from "../../models";
import { FireCollectionService } from "../../services";
import { User } from "@firebase/auth-types";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "fire-collection",
  templateUrl: "./fire-collections.component.html"
})
export class FireCollectionsComponent implements OnInit {
  carts: Cart[];
  selectedCart: Cart;
  userId: string;

  constructor(private cartService: FireCollectionService, private authService: AngularFireAuth) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.cartService.findByUser(user.uid).subscribe(carts => {
          this.carts = carts;
        });
      }
    });
  }

  onAddCart() {
    const name = prompt("Enter a name for your cart.");
    if (name && name.length > 0) {
      const cart = { userId: this.userId, name } as Cart;
      this.cartService.add(cart);
    }
  }

  onSelect(cart: Cart) {
    this.selectedCart = cart;
  }

  onEdit(cart: Cart) {
    const name = prompt("Update the name of your cart.", cart.name);

    if (name && name.length > 0) {
      const updatedCart = { ...cart, name } as Cart;
      this.cartService.update(updatedCart);
      this.selectedCart = undefined;
    }
  }

  onDelete(cart: Cart) {
    console.info("onDelete", cart);
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      this.cartService.delete(cart.id);
      this.selectedCart = undefined;
    }
  }
}
