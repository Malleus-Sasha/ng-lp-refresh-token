import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { UserDTO } from '../types/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  onLogin(user: User) {
    const url = 'https://freeapi.gerasim.in/api/JWT/login';
    return this.http.post<UserDTO>(url, user);
  } 

  getUsers() {
    return this.http.get('https://freeapi.gerasim.in/api/JWT/GetAllUsers');
  }
}
