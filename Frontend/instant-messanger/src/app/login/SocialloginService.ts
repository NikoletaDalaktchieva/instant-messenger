import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class SocialloginService {
    constructor(private http: HttpClient) { }

    Savesresponse(responce: any) {
        return this.http.post('http://localhost:64726/Api/Login/Savesresponse', responce);
    }
}