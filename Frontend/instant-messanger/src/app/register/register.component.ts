import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  title = AppComponent.title;
  constructor() { }

  ngOnInit(): void {
  }

  
  registerUser(username: string, email: string, password: string, confirmed_password: string) {
    alert(username + '\n' + email + '\n' + password + '\n' + confirmed_password);
    //call server
  }


}
