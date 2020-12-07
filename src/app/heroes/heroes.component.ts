import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  HeroAPIResponse,
  HeroInterface,
} from '../shared/interfaces/heroInterface';
import { HeroesService } from '../shared/services/heroes.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  private readonly heroesSubscriptionDestroyed$: Subject<boolean> = new Subject<boolean>();

  heroes: HeroInterface[] = [];
  selectedHeroes;
  lastSearch: string;
  eror: boolean = true;
  loading: boolean = false;

  constructor(
    private heroesService: HeroesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.selectedHeroes = this.heroesService.getSelectedHeroes();
  }

  searchHero(heroName: string): void {
    this.heroesService
      .searchHeroes(heroName)
      .pipe(takeUntil(this.heroesSubscriptionDestroyed$))
      .subscribe(
        (heroes) => {
          this.lastSearch = heroName;
          this.heroes = this.setHeroes(heroes);
          this.heroesService.addNewQuery(heroName);
          this.eror = false;
        },
        (error) => {
          this.eror = true;
          this.notificationService.notify(error);
        }
      );
  }

  setHeroes(heroes: HeroInterface[]): HeroInterface[] {
    return heroes.map((hero) => {
      const selectedHeroes = [...this.heroesService.getSelectedHeroes()];
      return selectedHeroes.findIndex(
        (selectedHero: HeroInterface) => selectedHero.id === hero.id
      ) >= 0
        ? { ...hero, selected: true }
        : hero;
    });
  }

  heroSelect(id: string): void {
    const indexOfSelected = this.heroes.findIndex((hero) => hero.id === id);
    this.heroes[indexOfSelected].selected = true;
  }

  ngOnDestroy(): void {
    this.heroesSubscriptionDestroyed$.next(true);
  }
}
