import { AbstractControl } from '@angular/forms';

export interface IUser {
  username?: string;
  email: string;
  password: string;
}

export interface IFormControls {
  [key: string]: AbstractControl;
}

export interface IAuthResult {
  [key: string]: boolean;
}

export interface IEnteredCredentials {
  email: string;
  password: string;
}
