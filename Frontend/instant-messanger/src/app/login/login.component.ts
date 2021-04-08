import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Instant messanger';

  constructor() {
  }

  ngOnInit(): void {
  }

  loginUser(email: string, u_password: string) {
    alert(email + '\n' + u_password);
    //call server
  }
}
