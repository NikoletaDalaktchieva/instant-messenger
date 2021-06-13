import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import { ErrorService } from "../services/error.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = environment.appTitle;

  name = '';
  password = '';

  constructor(private userService: UserService,
    private router: Router,
    private errorService: ErrorService,
  ) { }

  loginUser(name: string, password: string) {

    name.trim();
    password.trim();

    if (name === "" || password === ""){
      this.errorService.showError('Please fill in all fields');
      return;
    }
    this.userService.logIn(name, password).
      subscribe(
        result => {
          if (result.result) {
            this.userService.setSession(result);
            this.router.navigateByUrl('');
          } else {
            this.errorService.showError(result.message);
          }
        },
        error => { this.errorService.showError(); },
        () => { }
      );
  }
}