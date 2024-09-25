import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  invalidLogin = false;

  constructor(private router: Router) {}

  handleLogin() {
    console.log(this.username);
    console.log(this.password);
    if (this.username === 'suhail' && this.password === 'abc') {
      this.invalidLogin = false;
      this.router.navigate(['welcome']);
    } else {
      this.invalidLogin = true;
    }
  }
}
