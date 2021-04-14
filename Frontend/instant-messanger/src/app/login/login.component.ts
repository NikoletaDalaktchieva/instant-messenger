import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Instant messanger';
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  loginUser(email: string, password: string) {
    alert(email + '\n' + password);
  }
}
