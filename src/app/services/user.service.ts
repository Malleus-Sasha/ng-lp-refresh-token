import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  onLogin(user) {
    const url = 'https://freeapi.gerasim.in/api/JWT/login';
    return this.http.post(url, user);
  }
}
