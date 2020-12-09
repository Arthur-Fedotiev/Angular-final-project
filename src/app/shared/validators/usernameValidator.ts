import { AbstractControl, ValidationErrors } from '@angular/forms';
import VALIDATE_CONST from '../constants/validateConstants';

export class UsernameValidator {
  static validateCasePatterns(
    control: AbstractControl
  ): ValidationErrors | null {
    const allowedCasePatterns = [
      VALIDATE_CONST.SPACE_CASE_PATTERN,
      VALIDATE_CONST.KEBAB_CASE_PATTERN,
      VALIDATE_CONST.CAMEL_CASE_PATTERN,
    ];

    const allowedPattern = allowedCasePatterns.some((pattern) =>
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
  }
}
