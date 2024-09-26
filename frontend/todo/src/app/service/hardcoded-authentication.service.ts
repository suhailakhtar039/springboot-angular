import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {}

  authenticate(username: string, password: string) {
    if (username === 'suhail' && password === 'abc') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    if (isPlatformBrowser(this._platformId)) {
      console.log('Before session');
      const user = sessionStorage.getItem('authenticatedUser');

      return !(user == null);
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }
}
