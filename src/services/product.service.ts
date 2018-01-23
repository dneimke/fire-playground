import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFirestore } from "angularfire2/firestore";
import { Product } from "../models";
import { Subject } from "rxjs/Subject";
import { BaseService } from "./base.service";

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(afs: AngularFirestore) {
    super("products", afs);
  }

  // Custom Methods
}
