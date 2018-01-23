import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFirestore } from "angularfire2/firestore";
import { Category } from "../models";
import { Subject } from "rxjs/Subject";
import { BaseService } from "./base.service";

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(afs: AngularFirestore) {
    super("categories", afs);
  }

  // Custom Methods
}
