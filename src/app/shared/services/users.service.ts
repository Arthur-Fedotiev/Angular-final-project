import { Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/authInterface';
import CONSTANTS from '../constants';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private notificationService: NotificationService) {}

  getUsersFromStorage(): UserInfo[] {
    return JSON.parse(localStorage.getItem(CONSTANTS.USERS));
  }

  setEmptyLocalStoage(): void {
    localStorage.setItem(CONSTANTS.USERS, JSON.stringify([]));
  }

  addNewUserToLocalStorage(newUser: UserInfo): void {
    const usersFromStorage = this.getUsersFromStorage();

    this.isNewUser(newUser)
      ? this.handleSavingToLocalStorage(usersFromStorage, newUser)
      : this.notificationService.notify(CONSTANTS.SIGNUP_EXISTED);
  }

  isNewUser(newUser: UserInfo): boolean {
    const usersFromStorage = this.getUsersFromStorage();

    return !!usersFromStorage.findIndex(
      (user: UserInfo) => user.email === newUser.email
    );
  }

  private handleSavingToLocalStorage(
    usersFromStorage: Array<UserInfo | null>,
    newUser: UserInfo
  ): void {
    localStorage.setItem(
      CONSTANTS.USERS,
      JSON.stringify([...usersFromStorage, newUser])
    );
    this.notificationService.notify(CONSTANTS.SIGNUP_SUCCESS);
  }

  static isLocalStorageexists(): boolean {
    return !!JSON.parse(localStorage.getItem(CONSTANTS.USERS));
  }
}
