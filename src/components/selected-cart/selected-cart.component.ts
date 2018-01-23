import { Input, Component, EventEmitter, Output } from "@angular/core";
import { Cart } from "../../models";

@Component({
  selector: "selected-cart",
  template: `
    <div class='card'>
        <h2>Selected Cart</h2>
        <pre>{{cart | json}}</pre>
        <button mat-raised-button color="primary" (click)="onEdit(cart)">Edit</button>
        <button mat-raised-button color="warn" (click)="onDelete(cart)">Delete</button>
        <button mat-raised-button (click)="onCancel(cart)">Cancel</button>
    </div>
    `,
  styles: []
})
export class SelectedCartComponent {
  @Input() cart: Cart;
  @Output() edit = new EventEmitter<Cart>();
  @Output() delete = new EventEmitter<Cart>();
  @Output() cancel = new EventEmitter();

  onEdit(cart: Cart) {
    this.edit.emit(cart);
  }

  onDelete(cart: Cart) {
    this.delete.emit(cart);
  }

  onCancel() {
    this.cancel.emit();
  }
}
