import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { AppComponent } from '../app.component';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  roomId = null;
  socket = io(AppComponent.url);
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }

  load() {
    return this.http.get(AppComponent.url + "/chat")
  }


  public setChatId(roomId: any) {
    this.roomId = roomId;
  }


  public sendMessage(message: any) {
    if (this.roomId === null) return;
    const user = {
      _id: localStorage.getItem('id_user'),
      name: localStorage.getItem('name_user')
    }
    this.socket.emit('message', this.roomId, user, message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (roomId, user, message) => {
      console.log(roomId);
      if (roomId === this.roomId) {
        console.log(message);
        this.message$.next(message);
      }
    });

    return this.message$.asObservable();
  };
}