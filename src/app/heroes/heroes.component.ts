import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeroAPIResponse } from '../shared/interfaces/heroInterface';
import { HeroesService } from '../shared/services/heroes.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  private readonly heroesSubscriptionDestroyed$: Subject<boolean> = new Subject<boolean>();

  heroes: HeroAPIResponse;
  lastSearch: string;

  constructor(
    private heroesService: HeroesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  searchHero(heroName: string): void {
    this.heroesService
      .searchHeroes(heroName)
      .pipe(takeUntil(this.heroesSubscriptionDestroyed$))
      .subscribe(
        (heroes) => {
          this.lastSearch = heroName;
          this.heroes = heroes;
        },
        (error) => this.notificationService.notify(error)
      );
  }

  ngOnDestroy(): void {
    this.heroesSubscriptionDestroyed$.next(true);
  }
}
