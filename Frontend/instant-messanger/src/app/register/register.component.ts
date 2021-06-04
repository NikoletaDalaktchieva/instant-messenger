import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../app.component";
import { UserService } from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  title = AppComponent.title;
  constructor(private userService: UserService,) { }

  ngOnInit(): void {
  }

  
  registerUser(user: string, email: string, password: string, confirmed_password: string) {
    if(password != confirmed_password) {
      AppComponent.showError('Different passwords');
      return;
    }
    this.userService.create(user, email, password);
  }


}
