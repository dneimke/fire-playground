import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Cart } from "../../models";
import { FlatCollectionService } from "../../services";
import { User } from "@firebase/auth-types";
import { AngularFireAuth } from "angularfire2/auth";
import { of } from "rxjs/observable/of";

@Component({
  selector: "flat-collection",
  templateUrl: "./flat-collections.component.html"
})
export class FlatCollectionsComponent implements OnInit {
  carts$: Observable<Cart[]>;
  selectedCart: Cart;
  userId: string;

  constructor(private cartService: FlatCollectionService, private authService: AngularFireAuth) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        console.log(user.uid);
        this.userId = user.uid;
        this.carts$ = this.cartService.findByUser(user.uid);
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

  onSelect(cartId: string) {
    this.cartService.find(cartId).subscribe(c => {
      this.selectedCart = c;
    });
  }

  onEdit(cart: Cart) {
    const name = prompt("Update the name of your cart.", cart.name);

    if (name && name.length > 0) {
      const updatedCart = { ...cart, name } as Cart;
      this.cartService.update(updatedCart);
    }
  }

  onDelete(cart: Cart) {
    console.info("onDelete", cart);
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      this.cartService.delete(cart.id);
    }
  }
}
