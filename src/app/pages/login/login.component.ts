import { Component, inject } from '@angular/core';
import { User } from '../../types/user';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form = new FormGroup({
    emailId: new FormControl('rahul@gmail.com', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('223344', { nonNullable: true, validators: [Validators.required] }),
  })
  // router = inject(Router);

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  login() {
    // rahul@gmail.com 22334
    console.log(':USER: ', this.form.getRawValue());
    this.userService.onLogin(this.form.getRawValue()).subscribe(
      (res) => {
        if (res.result) {
          localStorage.setItem('TokenData', JSON.stringify(res.data));
          localStorage.setItem('TokenEmail', res.data.emailId);
          localStorage.setItem('TokenUserId', `${res.data.userId}`);
          this.router.navigateByUrl('dashboard');
        } else {
          alert(res.message);
        }
      }, error => {
        alert('Wrong Credentials');
        // console.error('(error):Wrong Credentials');
      })
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      console.dir(res);
    })
  }
}
