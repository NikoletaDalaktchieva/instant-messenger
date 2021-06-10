import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private router: Router, 
    private http: HttpClient) { }

  logIn(name: string, password: string) {
    return this.http.post<any>(environment.serveUrl + "/user/login",
      {
        user: name,
        password: password
      });
  }

  create(user: string, email: string, password: string) {
    return this.http.post<any>(environment.serveUrl + "/user",
      {
        user: user,
        email: email,
        password: password
      });
  }

  load() {
    return this.http.get<any>(environment.serveUrl + "/user");
  }

  setSession(authResult) {
    localStorage.setItem('id_token', authResult.token);
  }


  logout() {
    localStorage.removeItem("id_token");
  }

  public isLoggedIn() {
    return ! this.isLoggedOut();
  }

  isLoggedOut() {
    return  localStorage.getItem('id_token') === undefined || localStorage.getItem('id_token') === null;
  }
}
