import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { UserDTO } from '../types/user.dto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;

  constructor(private http: HttpClient) { 
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    })
  }

  onLogin(user: User) {
    const url = 'https://freeapi.gerasim.in/api/JWT/login';
    return this.http.post<UserDTO>(url, user);
  } 

  getRefreshToken() {
    let loggedUserData;
    const localData = localStorage.getItem('TokenData');
    if (localData != null) {
      loggedUserData = JSON.parse(localData);
    }
    const obj = {
      emailId: loggedUserData.emailId,
      token: '',
      refreshToken: loggedUserData.refreshToken,
    }
    this.http.post('https://freeapi.gerasim.in/api/JWT/refresh', obj).subscribe((res: any) => {
        localStorage.setItem('TokenData', JSON.stringify(res.data));
        this.$refreshTokenReceived.next(true);
    });
  }

  getUsers() {
    return this.http.get('https://freeapi.gerasim.in/api/JWT/GetAllUsers');
  }
}
