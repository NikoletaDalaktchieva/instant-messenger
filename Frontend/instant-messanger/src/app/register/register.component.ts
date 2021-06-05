import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { ErrorService } from "../services/error.service";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  title = environment.appTitle;
  email = '';
  username = '';
  password = '';
  confirmed_password = '';

  constructor(private userService: UserService,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }

  registerUser(user: string, email: string, password: string, confirmed_password: string) {

    user.trim();
    email.trim();
    password.trim();
    confirmed_password.trim();
    if (user === "" || email === "" || password === "" || confirmed_password === "") {
      this.errorService.showError('Please fill in all fields');
      return;
    }

    //very basic regex for the email
    if (!email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")) {
      this.errorService.showError('Invalid email');
      return;
    }

    if (password.length < 6 || !password.includes('.') && !password.includes('!')) {
      this.errorService.showError('Weak password');
      return;
    }

    if (password != confirmed_password) {
      this.errorService.showError('Different passwords');
      return;
    }



    //whitespaces validator


    var result;
    this.userService.create(user, email, password)
      .subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result) {
            this.userService.setSession(response);
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