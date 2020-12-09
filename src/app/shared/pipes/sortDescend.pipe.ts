import { Pipe, PipeTransform } from '@angular/core';
import { IPowerUp } from '../interfaces/userDataInterfaces';

@Pipe({
  name: 'sortDescendNumber',
})
export class SortingPipe implements PipeTransform {
  transform(powerUps: IPowerUp[]): IPowerUp[] {
    powerUps.sort((firstItem: IPowerUp, secondItem: IPowerUp) => {
      if (firstItem.usesLeft > secondItem.usesLeft) {
        return -1;
      } else if (firstItem.usesLeft < secondItem.usesLeft) {
        return 1;
      } else {
        return 0;
      }
    });

    return powerUps;
  }
}
