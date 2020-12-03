import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, AuthResult } from '../interfaces/authInterface';
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

  signup(newUser: UserInfo): void {
    console.log(newUser);

    const expirationDate = new Date(Date.now() + 1 * 3600 * 60).getTime();

    this.saveNewUser(newUser);
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');
  }

  login(userInfo: UserInfo): void {
    this.getUsersFromStorage();
    const authResult = this.authenticateUser(userInfo);

    if (authResult.noUser) {
      return this.notificationService.notify(
        "Unfortunatelly, there is no user with provided e-mail. Please make sure you've enter correct data or sign-up first."
      );
    }

    if (authResult.wrongPassword) {
      return this.notificationService.notify(
        'Unfortunatelly, password is wrong. Please try again.'
      );
    }

    const expirationDate = new Date(Date.now() + 1 * 3600 * 60).getTime();

    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');
  }

  logout(): void {
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

    sessionIsExpired &&
      this.notificationService.notify(
        'Your session is out of date, please login back again!'
      );

    return !sessionIsExpired;
  }

  private setActiveSession(expirationDate: number | boolean): void {
    localStorage.setItem(
      CONSTANTS.AUTHENTICATION_KEY,
      JSON.stringify(expirationDate)
    );
  }

  private setNewUsersLocalStorage(newUser: UserInfo): void {
    const newUsers = [newUser];
    localStorage.setItem(CONSTANTS.USERS, JSON.stringify(newUsers));
    this.notificationService.notify(CONSTANTS.SIGNUP_SUCCESS);
  }

  private addNewUserToLocalStorage(newUser: UserInfo): void {
    const usersFromStorage = this.getUsersFromStorage();
    const isNewUser = !!usersFromStorage.findIndex(
      (user: UserInfo) => user.email === newUser.email
    );

    if (isNewUser) {
      localStorage.setItem(
        CONSTANTS.USERS,
        JSON.stringify([...usersFromStorage, newUser])
      );
      this.notificationService.notify(CONSTANTS.SIGNUP_SUCCESS);
    }

    if (!isNewUser) {
      this.notificationService.notify(CONSTANTS.SIGNUP_EXISTED);
    }
  }

  private saveNewUser(newUser: UserInfo): void {
    localStorage.getItem(CONSTANTS.USERS)
      ? this.addNewUserToLocalStorage(newUser)
      : this.setNewUsersLocalStorage(newUser);
  }

  private getUsersFromStorage(): UserInfo[] {
    return JSON.parse(localStorage.getItem(CONSTANTS.USERS));
  }

  private authenticateUser(userToCheck: UserInfo): AuthResult {
    let authResult: AuthResult = { noUser: false, wrongPassword: false };
    const storedUsers = this.getUsersFromStorage();
    const isRegisteredUser = storedUsers.findIndex(
      (user) => user.email === userToCheck.email
    );

    if (!!isRegisteredUser) {
      authResult.noUser = true;
    }

    if (!isRegisteredUser) {
      authResult.wrongPassword =
        storedUsers[isRegisteredUser].password === userToCheck.password;
    }

    return authResult;
  }
}
