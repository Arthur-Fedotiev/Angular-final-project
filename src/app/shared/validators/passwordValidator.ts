import { ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import VALIDATE_CONST from '../constants/validateConstants';

export class PasswordValidator {
  static cannotContainEmailParts: ValidatorFn = (
    formGroup: FormGroup
  ): ValidationErrors | null => {
    const email: string = formGroup.get('email').value.toLowerCase();
    const password: string = formGroup.get('password').value.toLowerCase();
    const emailParts: string[] = email
      .substring(0, email.indexOf('@'))
      .split(/[.]/);
    const passwordIsUnique: boolean =
      emailParts.filter((part) => part && password.includes(part)).length === 0;

    return password && email && !passwordIsUnique
      ? {
          passwordIsUnique: {
            passwordUniqnessAlert: VALIDATE_CONST.PASSWORD_ALERT,
          },
        }
      : null;
  };
}
