import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import VALIDATE_CONST from '../constants/validateConstants';

export class PatternValidator {
  static cannotContainSpaces(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.value.includes(' ')
      ? {
          cannotContainSpace: true,
        }
      : null;
  }

  static validateCasePatterns(...validationPatterns: RegExp[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowedPattern = validationPatterns.some((pattern) =>
        pattern.test(control.value)
      );

      if (allowedPattern) {
        return null;
      } else
        return {
          casePattern: {
            forbiddenNameAlert: VALIDATE_CONST.FORBIDDEN_USERNAME_ALERT,
          },
        };
    };
  }
}
