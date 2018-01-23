import { Input, Component, EventEmitter, Output } from "@angular/core";
import { Cart, BaseEntity } from "../../models";

@Component({
  selector: "item-editor",
  template: `
    <div class='card'>
        <h2>Selected Item</h2>
        <pre class='json-view'>{{item | json}}</pre>
        <button mat-raised-button color="primary" (click)="onEdit(item)">Edit</button>
        <button mat-raised-button color="warn" (click)="onDelete(item)">Delete</button>
        <button mat-raised-button (click)="onCancel(item)">Cancel</button>
    </div>
    `,
  styles: [".json-view { width: 440px; } "]
})
export class ItemEditorComponent {
  @Input() item: BaseEntity;
  @Output() edit = new EventEmitter<BaseEntity>();
  @Output() delete = new EventEmitter<BaseEntity>();
  @Output() cancel = new EventEmitter();

  onEdit(item: BaseEntity) {
    this.edit.emit(item);
  }

  onDelete(item: BaseEntity) {
    this.delete.emit(item);
  }

  onCancel() {
    this.cancel.emit();
  }
}
