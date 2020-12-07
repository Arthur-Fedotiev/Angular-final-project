import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selected',
})
export class SelectedPipe implements PipeTransform {
  transform(letters: string[], sortParameter: string): string[] {
    return letters.filter((letter) => letter !== sortParameter);
  }
}
