import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userList = [];
  constructor(private userService: UserService) {
    this.getUsers();
    this.userService.$refreshTokenReceived.subscribe((res: any) => {
      this.getUsers();
    })
    console.log("Users: ", this.userList);
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.userList = res.data;
    })
  }
}
