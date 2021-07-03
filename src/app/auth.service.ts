import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() { }

  authenticate(name: string, password: string) {
    if (name === 'elkip' && password === 'secret') {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}
