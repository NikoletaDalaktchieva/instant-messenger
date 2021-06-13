
import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';
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

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message: Message) => {
      this.messageList.push(message);
    });
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
    this.messageService.load(this.chat._id)
      .subscribe(
        result => {
          if (result.result) {
            this.messageList = result.message_list;
          } else {
            this.errorService.showError(result.message);
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
    if (this.newMessage === '') return;
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
