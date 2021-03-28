import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Instant messanger';
  singUp = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openRegister(){
    this.singUp = true;
  }

  openLogin(){
    this.singUp = false;
  }


  loginUser(email: string, u_password: string) {
    alert(email + '\n' + u_password);
    //call server
  }

  registerUser(username: string, email: string, password: string, confirmed_password: string) {
    alert(username + '\n' + email + '\n' + password + '\n' + confirmed_password);
    //call server
  }


}
