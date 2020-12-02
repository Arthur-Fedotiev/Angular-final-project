import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../interfaces/authInterface';
import CONSTANTS from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isActiveSession = new BehaviorSubject(this.getIsActiveSession());
  isActiveSession$ = this.isActiveSession.asObservable();
  constructor(private router: Router) {}

  login(userInfo: UserInfo) {
    const expirationDate = new Date(Date.now() + 1 * 3600 * 60).getTime();

    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/home');
  }

  logout() {
    this.setActiveSession(false);
    this.isActiveSession.next(false);
    this.router.navigateByUrl('/login');
  }

  getIsActiveSession(): boolean {
    const sessionExpirationDate = JSON.parse(
      localStorage.getItem(CONSTANTS.AUTHENTICATION_KEY)
    );
    const sessionIsExpired = Date.now() > sessionExpirationDate;
    return !sessionIsExpired;
  }

  private setActiveSession(expirationDate: number | boolean) {
    localStorage.setItem(
      CONSTANTS.AUTHENTICATION_KEY,
      JSON.stringify(expirationDate)
    );
  }
}
