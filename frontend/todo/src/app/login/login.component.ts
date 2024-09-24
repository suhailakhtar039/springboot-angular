import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = 'suhail';
  password = 'abc';
  errorMessage = 'invalid credentials';
  handleLogin() {
    console.log(this.username);
    console.log(this.password);
  }
}
