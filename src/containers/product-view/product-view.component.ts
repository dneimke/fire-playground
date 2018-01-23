import { Input, Component, EventEmitter, Output, OnInit } from "@angular/core";
import { User, Product } from "../../models";
import { ProductService } from "../../services";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "product-view",
  templateUrl: "./product-view.component.html",
  styles: []
})
export class ProductViewComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  user: Observable<User>;
  userId: string;
  productSubscription: Subscription;

  constructor(private productService: ProductService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.productSubscription = this.productService.list().subscribe(products => {
          this.products = products;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  onAddProduct() {
    const name = prompt("Enter a name for your product.");
    if (name && name.length > 0) {
      const product = { id: undefined, userId: this.userId, name, unitPrice: 0 } as Product;
      this.productService.add(product);
    }
  }

  onSelectProduct(product: Product) {
    this.selectedProduct = product;
  }

  onCancel() {
    this.selectedProduct = undefined;
  }

  onEditProduct(product: Product) {
    const name = prompt("Update the name of your product.", product.name);

    if (name && name.length > 0) {
      const updatedProduct = { ...product, name } as Product;
      this.productService.update(updatedProduct);
      this.selectedProduct = undefined;
    }
  }

  onDeleteProduct(product: Product) {
    console.info("onDelete", product);
    const confirmed = confirm("Are you sure you want to delete this record?");
    if (confirmed) {
      this.productService.delete(product.id);
      this.selectedProduct = undefined;
    }
  }
}
