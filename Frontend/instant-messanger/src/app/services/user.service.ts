import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private router: Router, 
    private http: HttpClient) { }

  logIn(name: string, password: string) {
    return this.http.post<User>(environment.serveUrl + "/user/login",
      {
        user: name,
        password: password
      });
  }

  create(user: string, email: string, password: string) {
    //if (email.includes('@')){}
    return this.http.post<User>(environment.serveUrl + "/user",
      {
        user: user,
        email: email,
        password: password
      });
  }

  load() {
    return this.http.get<User>(environment.serveUrl + "/user");
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
    return  localStorage.getItem('id_token') === undefined || localStorage.getItem('id_token') === null;
  }
}
