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
    console.log(control.value);
    console.log(CONSTANTS.KEBAB_CASE_PATTERN.test(control.value));
    let allowedPattern = allowedCasePatterns.some((pattern) =>
      pattern.test(control.value)
    );

    console.log('Final output of allowedPattern is: ', allowedPattern);

    if (allowedPattern) {
      console.log(control.value);
      return null;
    } else
      return {
        casePattern: {
          forbiddenNameAlert: CONSTANTS.FORBIDDEN_USERNAME_ALERT,
        },
      };
  }
}
