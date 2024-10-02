import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private http: HttpClient
  ) {}

  // http://localhost:8080/hello-world-bean/akhtar
  executeHelloWorldServiceWithPathVariable(username: string, password: string) {
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });

    return this.http
      .get<AuthenticationBean>(`http://localhost:8080/basicauth`, { headers })
      .pipe(
        map((data) => {
          sessionStorage.setItem('authenticatedUser', username);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return data;
        })
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken(): string | null | undefined {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
    return 'no_token';
  }

  isUserLoggedIn() {
    if (isPlatformBrowser(this._platformId)) {
      // console.log('Before session');
      const user = sessionStorage.getItem('authenticatedUser');

      return !(user == null);
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('token');
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
