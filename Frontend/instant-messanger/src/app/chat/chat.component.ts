
import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
import { ErrorService } from "../services/error.service";
import { Message } from '../models/messageModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private _chat;
  newMessage: string = "";
  messageList: Message[] = [];
  searchMessage: string = "";

  constructor(private userService: UserService,
    private router: Router,
    private chatService: ChatService,
    private messageService: MessageService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message: Message) => {
      this.messageList.push(message);
    })
  }

  ngOnDestroy(): void {
    this.chatService.socketDisconect();
  }

  @Input()
  get chat(): any { return this._chat; }
  set chat(chat: any) {
    this._chat = (chat);
    this.chatService.setChatId(chat._id)
    this.loadMessages();
  }

  loadMessages() {
    var result;
    this.messageService.load(this.chat._id)
      .subscribe(
        response => {
          result = response;
          console.log(result);
          if (result.result) {
            console.log(result.message_list);
            this.messageList = result.message_list;
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

  sendMessage() {
    if(this.newMessage === '') return;  
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
