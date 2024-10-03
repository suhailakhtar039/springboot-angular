import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = 'in28minutes';
  password = '';
  errorMessage = 'invalid credentials';
  invalidLogin = false;

  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
  ) {}

  handleLogin() {
    if (
      this.hardcodedAuthenticationService.authenticate(
        this.username,
        this.password
      )
    ) {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin() {
    this.basicAuthenticationService
      .executeHelloWorldServiceWithPathVariable(this.username, this.password)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        (error) => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }

  handleJWTAuthLogin() {
    this.basicAuthenticationService
      .executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        (error) => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }
}
