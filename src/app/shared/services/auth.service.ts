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

  signup(newUser: NewUser): void {
    const expirationDate = new Date(Date.now() + 1 * 3600 * 60).getTime();

    this.saveNewUser(newUser);
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');
  }

  login(userInfo: UserInfo): void {
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

  private setNewUsersLocalStorage(newUser: NewUser): void {
    const newUsers = [newUser];
    localStorage.setItem(CONSTANTS.USERS, JSON.stringify(newUsers));
    this.notificationService.notify(CONSTANTS.SIGNUP_SUCCESS);
  }

  private addNewUserToLocalStorage(newUser: NewUser): void {
    const usersFromStorage = JSON.parse(localStorage.getItem(CONSTANTS.USERS));
    const isNewUser = !!usersFromStorage.findIndex(
      (user: NewUser) => user.email === newUser.email
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

  private saveNewUser(newUser: NewUser): void {
    localStorage.getItem(CONSTANTS.USERS)
      ? this.addNewUserToLocalStorage(newUser)
      : this.setNewUsersLocalStorage(newUser);
  }
}
