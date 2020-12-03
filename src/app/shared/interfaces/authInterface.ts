import { AbstractControl } from '@angular/forms';

export interface UserInfo {
  username?: string;
  email: string;
  password: string;
}

export interface FormControls {
  [key: string]: AbstractControl;
}
