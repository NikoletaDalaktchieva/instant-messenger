import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { AppComponent } from '../app.component';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  chat = {
    id : null,
    name : null
  };
  socket = io(AppComponent.url);
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor( private http: HttpClient) {
  }

  load() {
    return this.http.get(AppComponent.url + "/chat")
  }


  public setChat(chat: any) {
    this.chat = chat;
  }


  public sendMessage(message: any) {
    if(this.chat.id === null) return;
    this.socket.emit('message', this.chat, message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (room, message) => {
      console.log(room._id);
      if (room._id === this.chat.id) {   
        console.log(message);
        this.message$.next(message);
      }
    });

    return this.message$.asObservable();
  };
}