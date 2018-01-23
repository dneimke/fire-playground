import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Cart, Item } from "../../models";
import { CartService } from "../../services";
import { User } from "@firebase/auth-types";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "cart-editor",
  templateUrl: "./cart-editor.component.html"
})
export class CartEditorComponent implements OnInit {
  carts: Cart[];
  selectedCart: Cart;
  user: Observable<User>;
  userId: string;

  constructor(private cartService: CartService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.cartService.getForUser(user.uid).subscribe(carts => {
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

  onCancel() {
    this.selectedCart = undefined;
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
