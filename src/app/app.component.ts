import { Component } from "@angular/core";
import { UserService } from "../services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private authService: UserService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
