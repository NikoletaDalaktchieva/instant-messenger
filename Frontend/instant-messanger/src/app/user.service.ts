import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Router } from '@angular/router';
import { AppComponent } from "./app.component";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) { }

  logIn(name: string, password: string) {
    var result;
    new Promise((res, rej) => {
      this.http.post(AppComponent.url + "/user/login",
        {
          user: name,
          password: password
        }).
        subscribe(
          response => {
            result = response;
            if (result.result == "OK") {
              this.router.navigateByUrl('chat');
            }
          },
          error => { this.handleError(error); },
          () => { }
        );
    });

  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error)}`);
    }
    // return an observable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
  }

}
