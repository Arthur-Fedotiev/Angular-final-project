import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/shared/interfaces/heroInterface';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  heroes: IHero[];
  lastSelectedHero: IHero | null;

  constructor(private heroService: HeroesService) {}

  ngOnInit(): void {
    this.heroes = this.heroService.getSelectedHeroes();
    this.lastSelectedHero = this.heroService.getLastSelectedHero();
  }

  removeFromSelected(hero: IHero): void {
    this.heroService.removeFromSelected(hero.id);
    this.lastSelectedHero = this.heroService.getLastSelectedHero();
  }

  setNewLastSelectedHero(reselectedHero: IHero): void {
    this.heroService.setNewLastSelectedHero(reselectedHero);
    this.lastSelectedHero = this.heroService.getLastSelectedHero();
  }
}
