import { Input, Component, EventEmitter, Output, OnInit } from "@angular/core";
import { User, Category } from "../../models";
import { CategoryService } from "../../services";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "category-view",
  templateUrl: "./category-view.component.html",
  styles: []
})
export class CategoryViewComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category;
  user: Observable<User>;
  userId: string;
  categorySubscription: Subscription;

  constructor(private categoryService: CategoryService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.categorySubscription = this.categoryService.list().subscribe(categories => {
          this.categories = categories;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  onAddCategory() {
    const name = prompt("Enter a name for your category.");
    if (name && name.length > 0) {
      const category = { userId: this.userId, name } as Category;
      this.categoryService.add(category);
    }
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
  }

  onCancel() {
    this.selectedCategory = undefined;
  }

  onEditCategory(category: Category) {
    const name = prompt("Update the name of your category.", category.name);

    if (name && name.length > 0) {
      const updatedCategory = { ...category, name } as Category;
      this.categoryService.update(updatedCategory);
      this.selectedCategory = undefined;
    }
  }

  onDeleteCategory(category: Category) {
    console.info("onDelete", category);
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      this.categoryService.delete(category.id);
      this.selectedCategory = undefined;
    }
  }
}
