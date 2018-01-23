import { Input, Component, EventEmitter, Output } from "@angular/core";
import { Cart } from "../../models";

@Component({
  selector: "user-carts",
  template: `
    <ul class='list-unstyled'>
      <li *ngFor="let cart of carts">
          <a (click)="onSelect(cart)">
              <span class="badge">{{cart.name}}</span>
          </a>
      </li>
    </ul>
    `,
  styles: []
})
export class UserCartsComponent {
  @Input() carts: Cart[];
  @Output() select = new EventEmitter<Cart>();

  onSelect(cart: Cart) {
    this.select.emit(cart);
  }
}
