import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, NewUser } from '../interfaces/authInterface';
import CONSTANTS from '../constants';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isActiveSession = new BehaviorSubject(
    this.getIsActiveSession() || false
  );
  isActiveSession$ = this.isActiveSession.asObservable();
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  signup(newUser: NewUser) {
    console.log(newUser);

    const expirationDate = new Date(Date.now() + 1 * 3600 * 60).getTime();
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');
  }

  login(userInfo: UserInfo) {
    console.log(userInfo);

    const expirationDate = new Date(Date.now() + 1 * 3600 * 60).getTime();
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');
  }

  logout() {
    this.setActiveSession(false);
    this.isActiveSession.next(false);
    this.router.navigateByUrl('/login');
  }

  getIsActiveSession(): boolean {
    const isTokenExists = localStorage.getItem(CONSTANTS.AUTHENTICATION_KEY);

    if (!isTokenExists) return false;

    const sessionExpirationDate = JSON.parse(
      localStorage.getItem(CONSTANTS.AUTHENTICATION_KEY)
    );

    if (!sessionExpirationDate) return false;

    const sessionIsExpired = Date.now() > sessionExpirationDate;
    console.log(sessionIsExpired);

    sessionIsExpired &&
      this.notificationService.notify(
        'Your session is out of date, please login back again!'
      );

    return !sessionIsExpired;
  }

  private setActiveSession(expirationDate: number | boolean) {
    localStorage.setItem(
      CONSTANTS.AUTHENTICATION_KEY,
      JSON.stringify(expirationDate)
    );
  }
}
