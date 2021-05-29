import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../../../../../Backend/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  
  users = USERS;
  
  userSearch = '';

  constructor(private router: Router) { }

  
  ngOnInit(): void {

  }

  getSettings(event) {
    alert("There is no such name in the history list!");
  }

  openChat() {
    alert("Click");
    this.router.navigate(['register']);
  }
}
