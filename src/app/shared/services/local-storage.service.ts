import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem<T>(key: string): T | null {
    return this.isInStorage(key) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  daleteItem<T>(key: string): void {
    localStorage.removeItem(key);
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  isInStorage(key: string): boolean {
    return !!localStorage.getItem(key);
  }
}
