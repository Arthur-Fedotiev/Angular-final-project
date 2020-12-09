import { Injectable } from '@angular/core';
import AUTH_CONST from '../constants/authConstants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem<T>(key: string): T | null {
    return this.isInStorage(key) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  deleteItem<T>(key: string): void {
    localStorage.removeItem(key);
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  isInStorage(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  emptyLocalStorage(): void {
    this.deleteItem(AUTH_CONST.AUTHENTICATION_KEY);
    this.deleteItem(AUTH_CONST.QUERIES);
    this.deleteItem(AUTH_CONST.SELECTED_HEROES);
  }
}
