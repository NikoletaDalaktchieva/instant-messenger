import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }

  users = USERS;
  

  ngOnInit(): void {

  }

  inputText = document.getElementById("search-bar");
  personName = document.getElementById("name");
  btnSettings = document.getElementById("settings")?.addEventListener("click", (e: Event) => this.getSettings(e));

  getSettings(event) {
    alert("There is no such name in the history list!");
  }

  btnChat = document.getElementById("chat")?.addEventListener("click", (e: Event) => this.openChat());

  openChat() {
    alert("Click");
    //this.router.navigateByUrl('chat');
  }

  clickButtonFunction(event) {
    if (this.inputText?.isEqualNode(this.personName)) {
      //this.openChat(this.inputText);
    } else {
      alert("Settings!");
      console.log(event);
    }
  }


}
