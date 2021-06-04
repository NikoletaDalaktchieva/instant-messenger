import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, USERS } from 'src/user';
import { UserService } from "../services/user.service";
import { ErrorService } from "../services/error.service";
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  users = USERS;
  title = "Undefine";
  userSearch = '';

  constructor(private chatService: ChatService, private router: Router, private userService: UserService, private errorService: ErrorService) {
    
  }

  ngOnInit(): void {
    var result;
    this.userService.load().
      subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result === true) {
            console.log(result.users);
            this.users = result.users;
          } else {
            console.log(result.message);
            this.errorService.showError(result.message);
          }
        },
        error => { this.errorService.showError(); },
        () => { }
      );
    
    }
  


  getSettings(event) {
    alert("There is no such name in the history list!");
  }

  openChat(id: any, name: string) {
    this.title = name;
    this.chatService.setId(id)
  }
}
