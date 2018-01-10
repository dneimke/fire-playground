import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { AppMaterialModule } from "../modules/app-material.module";

import * as fromServices from "../services";
import * as fromContainers from "../containers";

// routes
export const ROUTES: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: fromContainers.HomeComponent },
  { path: "nested", component: fromContainers.NestedCollectionsComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppMaterialModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [AppComponent, fromContainers.containers],
  providers: [fromServices.services],
  bootstrap: [AppComponent]
})
export class AppModule {}
