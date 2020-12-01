import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import CONSTANTS from '../constants';

export class PasswordValidator {
  static pattern = CONSTANTS.PASSWORD_PATTERN;

  static cannotContainSpaces(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control.value.indexOf(' ') < 0) {
      return null;
    }

    return {
      cannotContainSpace: true,
    };
  }

  static cannotContainEmailParts: ValidatorFn = (
    formGroup: FormGroup
  ): ValidationErrors | null => {
    const email: string = formGroup.get('email').value.toLowerCase();
    const password: string = formGroup.get('password').value.toLowerCase();
    const emailParts = email.substring(0, email.indexOf('@')).split('.');
    const passwordIsUnique =
      emailParts.filter((part) => part && password.includes(part)).length === 0;

    return password && email && !passwordIsUnique
      ? {
          passwordIsUnique: {
            passwordUniqnessAlert: CONSTANTS.PASSWORD_ALERT,
          },
        }
      : null;
  };
}
