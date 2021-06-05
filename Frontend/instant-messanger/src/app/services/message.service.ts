import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Message } from '../models/messageModel';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  load(chatId) {
    const headers_object = new HttpHeaders({
      'Authorization': "" + localStorage.getItem('id_token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<Message>(environment.serveUrl + "/message?chatId=" + chatId, httpOptions);
  }
}