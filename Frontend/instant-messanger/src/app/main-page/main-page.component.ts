import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, USERS } from 'src/user';

import { AppComponent } from "../app.component";
import { UserService } from "../user.service";
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  users = USERS;
  title = "Undefine"
  userSearch = '';
  newMessage: string = "";
  messageList: string[] = [];

  constructor(private chatService: ChatService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })

    // var result;
    // this.userService.load().
    //   subscribe(
    //     response => {
    //       result = response;
    //       console.log(result);
    //       if (result.result === true) {
    //         console.log(result.users);
    //         this.users = result.users;
    //       } else {
    //         console.log(result.message);
    //         AppComponent.showError(result.message);
    //       }
    //     },
    //     error => { AppComponent.showError(); },
    //     () => { }
    //   );
  }


  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }





  getSettings(event) {
    alert("There is no such name in the history list!");
  }

  openChat(id: any, name: string) {
    this.title = name;
    this.chatService.setId(id)
  }
}
