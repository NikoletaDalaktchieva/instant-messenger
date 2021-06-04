import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  roomId = null;
  socket = io(environment.serveUrl);
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }

  load() {
    console.log(localStorage.getItem('id_token'))
    var headers_object = new HttpHeaders({
      'Authorization': "" + localStorage.getItem('id_token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(environment.serveUrl + "/chat", httpOptions)
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