import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ErrorService } from "../services/error.service";
import { AppComponent } from "../app.component";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router, private http: HttpClient, private errorService: ErrorService) { }

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
            this.setSession
            this.router.navigateByUrl('chat');
          } else {
            console.log(result.message);
            this.errorService.showError(result.message);
          }
        },
        error => { this.errorService.showError(); },
        () => { }
      );

      
  }

  create(user: string, email: string, password: string) {
    var result;
    new Promise((res, rej) => {
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
            if (result.result == 1) {
              console.log(result.id);
              this.router.navigateByUrl('chat');
            } else {
              console.log(result.message);
              this.errorService.showError(result.message);
            }
          },
          error => { this.errorService.showError(); },
          () => { }
        );
    });
  }

  load() {
    return this.http.get(AppComponent.url + "/user")
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');
  
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }  
}
