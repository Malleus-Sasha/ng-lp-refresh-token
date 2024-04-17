import { Component } from '@angular/core';
import { User } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = {
    EmailId: '',
    Password: '',
  }

  form = new FormGroup({
    EmailId: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  })

  login() {
    console.log(':USER: ', this.form.value);
  }
}
