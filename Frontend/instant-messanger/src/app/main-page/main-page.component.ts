import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from "../services/error.service";
import { ChatService } from '../services/chat.service';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
<<<<<<< HEAD
  chats;
  chatSearch = '';
  userName;
=======
  users = USERS;
  title = "Undefine"
  userSearch = '';
>>>>>>> develop

  constructor(private userService: UserService,
    private router: Router,
    private chatService: ChatService,
    private errorService: ErrorService) {
  }

  ngOnInit(): void {

    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    } else {
      this.loadChats();
    }
  }

  loadChats() {
    this.userName = localStorage.getItem('id_name');
    var result;
    this.chatService.load().
      subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result) {
            console.log(result.chat_list);
            this.chats = result.chat_list;
          } else {
            if (result.logout) {
              this.userService.logout();
              this.router.navigateByUrl('/login');
            } else {
              this.errorService.showError(result.message);
            }
          }
        },
        error => {
          console.log(error);
          this.errorService.showError();
        },
        () => { }
      );
  }

<<<<<<< HEAD
  openChat(chat: any) {
    this.chatService.setChatId(chat._id)
=======
  ngOnInit() {

  

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


  getSettings(event) {
    alert("There is no such name in the history list!");
>>>>>>> develop
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}

