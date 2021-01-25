import { InjectionToken } from '@angular/core';
import PROVIDERS_CONSTANT from './constants/providersConstants';
import { IAlphabet } from './interfaces/sharedInterfaces';

export const alphabetToken: InjectionToken<string> = new InjectionToken<string>(
  'alphabetToken'
);

export const alphabet: IAlphabet = {
  letters: [
    ...Array(PROVIDERS_CONSTANT.NUMBER_OF_ENG_LETTERS).keys(),
  ].map((letterNumber) =>
    String.fromCharCode(
      letterNumber + PROVIDERS_CONSTANT.TO_CHAR_CODE_NUMBER
    ).toUpperCase()
  ),
};
