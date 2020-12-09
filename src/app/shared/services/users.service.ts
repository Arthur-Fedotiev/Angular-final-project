import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/authInterface';
import AUTH_CONST from '../constants/authConstants';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private notificationService: NotificationService) {}

  getUsersFromStorage(): IUser[] {
    return JSON.parse(localStorage.getItem(AUTH_CONST.USERS));
  }

  setEmptyLocalStoage(): void {
    localStorage.setItem(AUTH_CONST.USERS, JSON.stringify([]));
  }

  addNewUserToLocalStorage(newUser: IUser): void {
    const usersFromStorage = this.getUsersFromStorage();

    this.isNewUser(newUser)
      ? this.handleSavingToLocalStorage(usersFromStorage, newUser)
      : this.notificationService.notify(AUTH_CONST.SIGNUP_EXISTED);
  }

  isNewUser(newUser: IUser): boolean {
    const usersFromStorage = this.getUsersFromStorage();

    return !!usersFromStorage.findIndex(
      (user: IUser) => user.email === newUser.email
    );
  }

  private handleSavingToLocalStorage(
    usersFromStorage: Array<IUser | null>,
    newUser: IUser
  ): void {
    localStorage.setItem(
      AUTH_CONST.USERS,
      JSON.stringify([...usersFromStorage, newUser])
    );
    this.notificationService.notify(AUTH_CONST.SIGNUP_SUCCESS);
  }

  static isLocalStorageexists(): boolean {
    return !!JSON.parse(localStorage.getItem(AUTH_CONST.USERS));
  }
}
