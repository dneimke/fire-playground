import { Input, Component, EventEmitter, Output, OnInit } from "@angular/core";
import { Cart, User } from "../../models";
import { CartService } from "../../services";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "cart-view",
  template: `
    <div *ngIf="user">
        Hello {{user.displayName}}!
    </div>

    <div class="container">
        <h3>Carts</h3>
        <p class="bg-info" style="padding: 15px; width: 50%" *ngIf="!(carts)">
            There are no items, click add to create one!
        </p>

        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <user-carts *ngIf='carts' [carts]='carts' (select)='onSelectCart($event)'></user-carts>
                </div>
                <div class="col-md-8">
                    <selected-cart *ngIf='selectedCart' [cart]='selectedCart' (cancel)='onCancel()' (edit)='onEditCart($event)' (delete)='onDeleteCart($event)'></selected-cart>
                </div>
            </div>
        </div>

        <button mat-raised-button color="primary" (click)="onAddCart()" *ngIf="user">Add</button>
    </div>
    `,
  styles: []
})
export class CartViewComponent implements OnInit {
  carts: Cart[];
  selectedCart: Cart;
  user: Observable<User>;
  userId: string;
  cartSubscription: Subscription;

  constructor(private cartService: CartService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.cartSubscription = this.cartService.getForUser(user.uid).subscribe(carts => {
          this.carts = carts;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe;
    }
  }

  onAddCart() {
    const name = prompt("Enter a name for your cart.");
    if (name && name.length > 0) {
      const cart = { userId: this.userId, name } as Cart;
      this.cartService.add(cart);
    }
  }

  onSelectCart(cart: Cart) {
    this.selectedCart = cart;
  }

  onCancel() {
    this.selectedCart = undefined;
  }

  onEditCart(cart: Cart) {
    const name = prompt("Update the name of your cart.", cart.name);

    if (name && name.length > 0) {
      const updatedCart = { ...cart, name } as Cart;
      this.cartService.update(updatedCart);
      this.selectedCart = undefined;
    }
  }

  onDeleteCart(cart: Cart) {
    console.info("onDelete", cart);
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      this.cartService.delete(cart.id);
      this.selectedCart = undefined;
    }
  }
}
