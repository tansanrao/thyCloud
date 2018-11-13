import { Component, OnInit } from "@angular/core";
import { AuthService, TokenPayload } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: "",
    full_name: "",
    password: ""
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/home");
      },
      err => {
        console.error(err);
      }
    );
  }
}
