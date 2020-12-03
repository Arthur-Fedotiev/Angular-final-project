import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, AuthResult } from '../interfaces/authInterface';
import CONSTANTS from '../constants';
import { NotificationService } from './notification.service';
import { UsersService } from './users.service';

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
    private notificationService: NotificationService,
    private usersService: UsersService
  ) {}

  signup(newUser: UserInfo): void {
    const expirationDate: number = new Date(
      Date.now() + 1 * 3600 * 60
    ).getTime();

    this.usersService.addNewUserToLocalStorage(newUser);
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');
  }

  login(userInfo: UserInfo): void {
    const authResult: AuthResult = this.authenticateUser(userInfo);

    if (authResult.noUser) {
      return this.notificationService.notify(CONSTANTS.LOGIN_NO_USER);
    }

    if (authResult.wrongPassword) {
      return this.notificationService.notify(CONSTANTS.LOGIN_WRONG_PASSWORD);
    }

    const expirationDate: number = new Date(
      Date.now() + 1 * 3600 * 60
    ).getTime();

    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');

    return this.notificationService.notify(CONSTANTS.LOGIN_SUCCESS);
  }

  logout(): void {
    this.setActiveSession(false);
    this.isActiveSession.next(false);
    this.router.navigateByUrl('/login');
  }

  getIsActiveSession(): boolean {
    const isTokenExists: string = localStorage.getItem(
      CONSTANTS.AUTHENTICATION_KEY
    );

    if (!isTokenExists) return false;

    const sessionExpirationDate = JSON.parse(
      localStorage.getItem(CONSTANTS.AUTHENTICATION_KEY)
    );

    if (!sessionExpirationDate) return false;

    const sessionIsExpired = Date.now() > sessionExpirationDate;

    sessionIsExpired &&
      this.notificationService.notify(CONSTANTS.SESSION_EXPIRED);

    return !sessionIsExpired;
  }

  private setActiveSession(expirationDate: number | boolean): void {
    localStorage.setItem(
      CONSTANTS.AUTHENTICATION_KEY,
      JSON.stringify(expirationDate)
    );
  }

  private authenticateUser(userToCheck: UserInfo): AuthResult {
    let authResult: AuthResult = { noUser: false, wrongPassword: false };
    const storedUsers = this.usersService.getUsersFromStorage();
    const isRegisteredUser = storedUsers.findIndex(
      (user) => user.email === userToCheck.email
    );

    if (!!isRegisteredUser) {
      authResult.noUser = true;
    }

    if (!isRegisteredUser) {
      authResult.wrongPassword =
        storedUsers[isRegisteredUser].password !== userToCheck.password;
    }

    return authResult;
  }
}
