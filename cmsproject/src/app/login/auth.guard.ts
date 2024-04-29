// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginAuthenticateService } from '../login/loginauthenticate.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginAuthenticateService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
  }
}
