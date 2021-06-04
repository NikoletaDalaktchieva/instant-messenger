import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { AppComponent } from "../app.component";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = AppComponent.title;
  socialUser: SocialUser = new SocialUser;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
      this.router.navigateByUrl('chat');
    });
  }


  loginUser(name: string, password: string) {
    this.userService.logIn(name, password);
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

}
