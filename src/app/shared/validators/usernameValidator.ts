import { AbstractControl, ValidationErrors } from '@angular/forms';
import CONSTANTS from '../constants';

export class UsernameValidator {
  static validateCasePatterns(
    control: AbstractControl
  ): ValidationErrors | null {
    const allowedCasePatterns = [
      CONSTANTS.SPACE_CASE_PATTERN,
      CONSTANTS.KEBAB_CASE_PATTERN,
      CONSTANTS.CAMEL_CASE_PATTERN,
    ];
    const allowedPattern = allowedCasePatterns.some((pattern) =>
      pattern.test(control.value)
    );

    if (!allowedPattern) {
      return {
        casePattern: {
          forbiddenNameAlert: CONSTANTS.FORBIDDEN_USERNAME_ALERT,
        },
      };
    }
    return null;
  }
}
