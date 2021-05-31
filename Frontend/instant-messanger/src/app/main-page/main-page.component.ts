import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, USERS } from 'src/user';

import { AppComponent } from "../app.component";
import { UserService } from "../user.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  users = USERS;
  userSearch = '';

  constructor(private router: Router, private userService: UserService) {
    this.loadUsers();
  }

  ngOnInit(): void {

  }

  getSettings(event) {
    alert("There is no such name in the history list!");
  }

  loadUsers(): void {
    var result;
    this.userService.load().
      subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result == true) {
            console.log(result.users);
            this.users = result.users;
          } else {
            console.log(result.message);
            AppComponent.showError(result.message);
          }
        },
        error => { AppComponent.showError(); },
        () => { }
      );

  }

  openChat() {
    alert("Click");
    this.router.navigate(['chat']);
  }
}
