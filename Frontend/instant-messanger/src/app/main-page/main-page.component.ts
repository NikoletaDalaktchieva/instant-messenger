import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from "../services/error.service";
import { ChatService } from '../services/chat.service';
import { UserService } from "../services/user.service";
import jwt_decode from "jwt-decode";
import { User } from '../models/userModel';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  chats;
  chatSearch = '';
  userName;
  name = '';
  currentChat;

  constructor(private userService: UserService,
    private router: Router,
    private chatService: ChatService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    } else {
      this.loadUser();
      this.loadChats();
    }
  }

  loadUser() {
    const tokenId = localStorage.getItem('id_token');
    if(tokenId === null) {
      return;
    }
    const token:User = jwt_decode(tokenId);
    this.userName = token.name;
  }

  loadChats() {
    var result;
    this.userName = localStorage.getItem('id_name');
    this.chatService.load()
      .subscribe(
        result => {
          if (result.result) {
            this.chats = result.chat_list;
            this.currentChat = this.chats[0];
          } else {
            this.errorService.hanleError(result);
          }
        },
        error => {
          console.log(error);
          this.errorService.showError();
        },
        () => { }
      );
  }

  openChat(chat: any) {
    this.currentChat = chat;
  }

  getSettings(event) {
    alert("Not implemented!");
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}