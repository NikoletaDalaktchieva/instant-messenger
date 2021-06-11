import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Message } from '../models/messageModel';

@Injectable({
  providedIn: 'root',
})

export class ChatService {
  roomId = null;
  socket = io(environment.serveUrl);
  public message$: BehaviorSubject<Message> = new BehaviorSubject(new Message('', '', new Date()));

  constructor(private http: HttpClient) { }

  load() {
    const headers_object = new HttpHeaders({
      'Authorization': "" + localStorage.getItem('id_token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<any>(environment.serveUrl + "/chat", httpOptions);
  }

  setChatId(roomId: any) {
    this.roomId = roomId;
    this.socket.emit('setRoom', this.roomId);
  }

  sendMessage(message: any) {
    if (this.roomId === null) return;
    const tokenId = localStorage.getItem('id_token');
    this.socket.emit('message', tokenId, this.roomId, message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: Message) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

  socketDisconect() {
    console.log('disconect')
    this.socket.disconnect();
  }
}