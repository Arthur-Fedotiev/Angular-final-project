import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, AuthResult } from '../interfaces/authInterface';
import CONSTANTS from '../constants';
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

  signup(newUser: UserInfo): void {
    const expirationDate = this.getExpirationDate();

    this.localStorageService.setItem(CONSTANTS.QUERIES, []);
    this.localStorageService.setItem(CONSTANTS.SELECTED_HEROES, []);
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

    const expirationDate = this.getExpirationDate();

    this.localStorageService.setItem(CONSTANTS.QUERIES, []);
    this.localStorageService.setItem(CONSTANTS.SELECTED_HEROES, []);
    this.setActiveSession(expirationDate);
    this.isActiveSession.next(true);
    this.router.navigateByUrl('/heroes');

    return this.notificationService.notify(CONSTANTS.LOGIN_SUCCESS);
  }

  logout(): void {
    this.localStorageService.daleteItem(CONSTANTS.AUTHENTICATION_KEY);
    this.localStorageService.daleteItem(CONSTANTS.QUERIES);
    this.localStorageService.daleteItem(CONSTANTS.SELECTED_HEROES);

    this.setActiveSession(false);
    this.isActiveSession.next(false);
    this.router.navigateByUrl('/login');
  }

  getIsActiveSession(): boolean {
    const isTokenExists: boolean = this.localStorageService.isInStorage(
      CONSTANTS.AUTHENTICATION_KEY
    );

    if (!isTokenExists) return false;

    const sessionIsExpired: boolean =
      Date.now() >
      this.localStorageService.getItem(CONSTANTS.AUTHENTICATION_KEY);

    if (sessionIsExpired) {
      this.localStorageService.daleteItem(CONSTANTS.AUTHENTICATION_KEY);
      this.localStorageService.daleteItem(CONSTANTS.QUERIES);
      this.heroesService.emptyHeroesStorage();
      this.notificationService.notify(CONSTANTS.SESSION_EXPIRED);
      return false;
    }

    return true;
  }

  private setActiveSession(expirationDate: number | boolean): void {
    expirationDate
      ? this.localStorageService.setItem(
          CONSTANTS.AUTHENTICATION_KEY,
          expirationDate
        )
      : this.localStorageService.daleteItem(CONSTANTS.AUTHENTICATION_KEY);
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
