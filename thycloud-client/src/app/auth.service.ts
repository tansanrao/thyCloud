import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {environment } from '../environments/environment';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  full_name?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("mean-token");
    this.router.navigateByUrl("/login");
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);

      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    method: "post" | "get" | "update",
    type: "login" | "register" | "profile",
    user?: TokenPayload
  ): Observable<any> {
    let base;

    if (method === "post" && type === "register") {
      base = this.http.post(environment.apiUrl + `v1/users/`, user);
    } else if (method === "post" && type === "login") {
      base = this.http.post(environment.apiUrl + `v1/users/login`, user);
    } else {
      base = this.http.get(environment.apiUrl + `v1/users/`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request("post", "register", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }

  public profile(): Observable<any> {
    return this.request("get", "profile");
  }
}
