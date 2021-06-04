import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  load(chatId) {
    var headers_object = new HttpHeaders({
      'Authorization': "" + localStorage.getItem('id_token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(environment.serveUrl + "/message?chatId" + chatId, httpOptions);
  }
}