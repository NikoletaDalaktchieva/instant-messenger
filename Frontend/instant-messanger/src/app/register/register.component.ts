import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { UserService } from "../services/user.service";
import { ErrorService } from "../services/error.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  title = AppComponent.title;

  email = '';
  username = '';
  password = '';
  confirmed_password = '';

  constructor(private userService: UserService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  
  registerUser(user: string, email: string, password: string, confirmed_password: string) {
    if(password != confirmed_password) {
      this.errorService.showError('Different passwords');
      return;
    }
    this.userService.create(user, email, password);
  }


}
