import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
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
  constructor(private userService: UserService,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }


  registerUser(user: string, email: string, password: string, confirmed_password: string) {
    if (password != confirmed_password) {
      this.errorService.showError('Different passwords');
      return;
    }

    var result;
    this.userService.create(user, email, password).
      subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result) {
            this.userService.setSession(response)
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
