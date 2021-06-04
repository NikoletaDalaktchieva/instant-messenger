import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ErrorService } from "../services/error.service";
import { AppComponent } from "../app.component";
import * as moment from "moment";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router, private http: HttpClient, private errorService: ErrorService) { }

  logIn(name: string, password: string) {
    return this.http.post(AppComponent.url + "/user/login",
      {
        user: name,
        password: password
      });
  }

  create(user: string, email: string, password: string) {
    return this.http.post(AppComponent.url + "/user",
      {
        user: user,
        email: email,
        password: password
      });
  }

  load() {
    return this.http.get(AppComponent.url + "/user")
  }

  setSession(authResult) {
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('id_user', authResult.user._id);
    localStorage.setItem('id_name', authResult.user.name);
  }


  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem('id_user');
    localStorage.removeItem('id_name');
  }

  public isLoggedIn() {
    return ! this.isLoggedOut();
  }

  isLoggedOut() {
    return  localStorage.getItem('id_token') === undefined || localStorage.getItem('id_token') === null;;
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration !== null) {
      var expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }

}
