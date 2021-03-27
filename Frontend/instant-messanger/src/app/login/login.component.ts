import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, AuthService } from 'angular-6-social-login';
import { Socialusers } from './Socialusers';
import { SocialloginService } from './SocialloginService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Instant messanger';
  singUp = false;

  constructor(
    public OAuth: AuthService,
    private SocialloginService: SocialloginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  loginUser(email: string, u_password: string) {
    alert(email + '\n' + u_password);
    //call server
  }

  registerUser(username: string, email: string, password: string, confirmed_password: string) {
    alert(username + '\n' + email + '\n' + password + '\n' + confirmed_password);
    //call server
  }

  //google
  public socialSignIn() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      console.log('google', socialusers);
      console.log(socialusers);
      this.Savesresponse(socialusers);

    });
  }


  Savesresponse(socialusers: Socialusers) {

    this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
      debugger;
      console.log(res);
      //response = res.userDetail;
      localStorage.setItem('socialusers', JSON.stringify(res));
      console.log(localStorage.setItem('socialusers', JSON.stringify(res)));
      this.router.navigate([`/Dashboard`]);
    })
  }
}
