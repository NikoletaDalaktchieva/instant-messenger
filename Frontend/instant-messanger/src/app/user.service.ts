import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Router } from '@angular/router';
import { AppComponent } from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) { }

  logIn(name: string, password: string) {
    var result;
    this.http.post(AppComponent.url + "/user/login",
      {
        user: name,
        password: password
      }).
      subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result) {
            this.router.navigateByUrl('chat');
          } else {
            console.log(result.message);
            AppComponent.showError(result.message);
          }
        },
        error => { AppComponent.showError(); },
        () => { }
      );
  }

  create(user: string, email: string, password: string) {
    var result;
    this.http.post(AppComponent.url + "/user",
      {
        user: user,
        email: email,
        password: password
      }).
      subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result) {
            console.log(result.id);
            this.router.navigateByUrl('chat');
          } else {
            console.log(result.message);
            AppComponent.showError(result.message);
          }
        },
        error => { AppComponent.showError(); },
        () => { }
      );
  }
}