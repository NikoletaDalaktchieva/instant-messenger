import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Instant messanger';
  socialUser: SocialUser = new SocialUser;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
  ) {
  }

  ngOnInit() {
    this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
    });
  }


  loginUser(email: string, password: string) {
    //alert(email + '\n' + password);
    this.router.navigateByUrl('chat');
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

}
