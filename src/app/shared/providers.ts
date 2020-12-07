import { InjectionToken } from '@angular/core';

export const alphabetToken = new InjectionToken('alphabetToken');

export const alphabet = {
  letters: [...Array(26).keys()].map((i) =>
    String.fromCharCode(i + 97).toUpperCase()
  ),
};
