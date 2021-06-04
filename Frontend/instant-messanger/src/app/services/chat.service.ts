import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Chat } from '../models/chatModel';
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
    var headers_object = new HttpHeaders({
      'Authorization': "" + localStorage.getItem('id_token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<Chat>(environment.serveUrl + "/chat", httpOptions);
  }

  public setChatId(roomId: any) {
    this.roomId = roomId;
  }

  public sendMessage(message: any) {
    if (this.roomId === null) return;
    
    const tokenId = localStorage.getItem('id_token');
    if(tokenId === null) return;
    const token = jwt_decode(tokenId);
    this.socket.emit('message', localStorage.getItem('id_token'), this.roomId, message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (roomId, message: Message) => {
      if (roomId === this.roomId) {
        this.message$.next(message);
      }
    });

    return this.message$.asObservable();
  };

  public socketDisconect() {
    console.log('disconect')
    this.socket.disconnect();
  }
}