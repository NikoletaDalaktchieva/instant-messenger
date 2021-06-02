import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  id = 1;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
    this.id = Math.floor(Math.random() * (3 - 1) + 1);
    console.log("id is " + this.id);
  }

  socket = io(AppComponent.url);

  public sendMessage(message: any) {
    this.socket.emit('message', this.id, message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (roomNo, message) => {
      if (roomNo === this.id) {
        console.log(roomNo);
        console.log(message);
        this.message$.next(message);
      }
    });

    return this.message$.asObservable();
  };
}