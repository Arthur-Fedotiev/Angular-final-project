import { Pipe, PipeTransform } from '@angular/core';
import { HeroInterface } from '../interfaces/heroInterface';

@Pipe({
  name: 'selected',
})
export class SelectedPipe implements PipeTransform {
  transform(
    heroes: HeroInterface[],
    favoriteHeroes: HeroInterface[]
  ): HeroInterface[] {
    console.log(favoriteHeroes);

    const transofrmedHeroes = heroes.map((hero) => {
      return favoriteHeroes.findIndex(
        (selectedHero) => selectedHero.id === hero.id
      ) >= 0
        ? { ...hero, selected: true }
        : hero;
    });
    console.log(transofrmedHeroes);

    return transofrmedHeroes;
  }
}
