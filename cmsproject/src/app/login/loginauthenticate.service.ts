import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticateService {
  private isAuthenticated: boolean = false;
  private loggedInStaffId: number | null = null;

  constructor() { }

  setAuthenticated(status: boolean) {
    this.isAuthenticated = status;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setLoggedInStaffId(staffId: number): void {
    this.loggedInStaffId = staffId;
  }

  getLoggedInStaffId(): number | null {
    return this.loggedInStaffId;
}
}
