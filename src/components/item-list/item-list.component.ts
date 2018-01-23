import { Input, Component, EventEmitter, Output } from "@angular/core";
import { BaseEntity } from "../../models";

@Component({
  selector: "item-list",
  template: `
    <ul class='list-unstyled'>
      <li *ngFor="let item of items">
          <a (click)="onSelect(item)">
              <span class="badge">{{item.name}}</span>
          </a>
      </li>
    </ul>
    `,
  styles: []
})
export class ItemListComponent {
  @Input() items: BaseEntity[];
  @Output() select = new EventEmitter<BaseEntity>();

  onSelect(item: BaseEntity) {
    this.select.emit(item);
  }
}
