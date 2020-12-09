import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  IUser,
  IAuthResult,
  IEnteredCredentials,
} from '../interfaces/authInterface';
import AUTH_CONST from '../constants/authConstants';
import { NotificationService } from './notification.service';
import { UsersService } from './users.service';
import { LocalStorageService } from './local-storage.service';
import { HeroesService } from './heroes.service';

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
    private usersService: UsersService,
    private localStorageService: LocalStorageService,
    private heroesService: HeroesService
  ) {}

  private getExpirationDate(): number {
    return new Date(Date.now() + 1 * 3600 * 600).getTime();
  }

  signup(newUser: IUser): void {
    const expirationDate = this.getExpirationDate();

    this.localStorageService.setItem(AUTH_CONST.QUERIES, []);
    this.localStorageService.setItem(AUTH_CONST.SELECTED_HEROES, []);
    this.usersService.addNewUserToLocalStorage(newUser);
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');
  }

  login(IUser: IUser): void {
    const IAuthResult: IAuthResult = this.authenticateUser(IUser);

    if (IAuthResult.noUser) {
      return this.notificationService.notify(AUTH_CONST.LOGIN_NO_USER);
    }

    if (IAuthResult.wrongPassword) {
      return this.notificationService.notify(AUTH_CONST.LOGIN_WRONG_PASSWORD);
    }

    const expirationDate = this.getExpirationDate();

    this.localStorageService.setItem(AUTH_CONST.QUERIES, []);
    this.localStorageService.setItem(AUTH_CONST.SELECTED_HEROES, []);
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');

    return this.notificationService.notify(AUTH_CONST.LOGIN_SUCCESS);
  }

  logout(): void {
    this.localStorageService.emptyLocalStorage();
    this.heroesService.emptyHeroesStorage();

    this.setActiveSession(false);
    this.isActiveSession.next(false);
    this.router.navigateByUrl('/login');
  }

  getIsActiveSession(): boolean {
    const isTokenExists: boolean = this.localStorageService.isInStorage(
      AUTH_CONST.AUTHENTICATION_KEY
    );

    if (!isTokenExists) {
      this.heroesService.emptyHeroesStorage();
      this.localStorageService.emptyLocalStorage();
      return false;
    }

    const sessionIsExpired: boolean =
      Date.now() >
      this.localStorageService.getItem(AUTH_CONST.AUTHENTICATION_KEY);

    if (sessionIsExpired) {
      this.localStorageService.emptyLocalStorage();
      this.heroesService.emptyHeroesStorage();
      this.notificationService.notify(AUTH_CONST.SESSION_EXPIRED);
    }

    return !sessionIsExpired;
  }

  private setActiveSession(expirationDate: number | boolean): void {
    expirationDate
      ? this.localStorageService.setItem(
          AUTH_CONST.AUTHENTICATION_KEY,
          expirationDate
        )
      : this.localStorageService.deleteItem(AUTH_CONST.AUTHENTICATION_KEY);
  }

  private authenticateUser({
    email: enteredEmail,
    password: enteredPassword,
  }: IEnteredCredentials): IAuthResult {
    const IAuthResult: IAuthResult = { noUser: false, wrongPassword: false };
    const storedUsers = this.usersService.getUsersFromStorage();
    const isRegisteredUser = storedUsers.findIndex(
      ({ email }) => email === enteredEmail
    );

    if (!!isRegisteredUser) {
      IAuthResult.noUser = true;
    }

    if (!isRegisteredUser) {
      IAuthResult.wrongPassword =
        storedUsers[isRegisteredUser].password !== enteredPassword;
    }

    return IAuthResult;
  }
}
