import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import * as fromContainers from "../containers";
import { AppMaterialModule } from "../modules/app-material.module";

// routes
export const ROUTES: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: fromContainers.HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppMaterialModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [AppComponent, fromContainers.containers],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
