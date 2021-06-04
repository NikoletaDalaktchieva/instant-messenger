import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { AppComponent } from "../app.component";
import { UserService } from "../services/user.service";
import { ErrorService } from "../services/error.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = environment.appTitle;
  socialUser: SocialUser = new SocialUser;

  name = '';
  password = '';

  constructor(private userService: UserService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private errorService: ErrorService,
  ) {
  }

  ngOnInit() {
    
    console.log(this.userService.isLoggedIn())
     if (this.userService.isLoggedIn()) {
       this.router.navigateByUrl('');
     }
  }


  loginUser(name: string, password: string) {
    var result;
    this.userService.logIn(name, password).
      subscribe(
        response => {
          result = response;
          console.log('result');
          console.log(result);
          if (result.result) {
            this.userService.setSession(response);
            this.router.navigateByUrl('');
          } else {
            console.log(result.message);
            this.errorService.showError(result.message);
          }
        },
        error => { this.errorService.showError(); },
        () => { }
      );
  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

}
