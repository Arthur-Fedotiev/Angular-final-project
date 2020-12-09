import { Injectable } from '@angular/core';
import AUTH_CONST from '../constants/authConstants';
import { battleHistory, powerUps } from '../utils/mockData';

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

  initializeLocalStorage(): void {
    this.setItem(AUTH_CONST.QUERIES, []);
    this.setItem(AUTH_CONST.SELECTED_HEROES, []);
    this.setItem(AUTH_CONST.BATTLE_HISTORY, battleHistory);
    this.setItem(AUTH_CONST.POWERUPS, powerUps);
  }

  emptyLocalStorage(): void {
    this.deleteItem(AUTH_CONST.AUTHENTICATION_KEY);
    this.deleteItem(AUTH_CONST.QUERIES);
    this.deleteItem(AUTH_CONST.SELECTED_HEROES);
    this.deleteItem(AUTH_CONST.POWERUPS);
    this.deleteItem(AUTH_CONST.BATTLE_HISTORY);
  }
}
