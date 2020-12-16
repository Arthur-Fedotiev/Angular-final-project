import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  finalize,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IHero } from '../shared/interfaces/heroInterface';
import { HeroesService } from '../shared/services/heroes.service';
import { NotificationService } from '../shared/services/notification.service';
import TIME_CONST from '../shared/constants/providersConstants';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  searchInputText: Subject<string> = new Subject<string>();
  searchInputText$: Observable<string> = this.searchInputText.asObservable();

  heroes$: Observable<IHero[]>;

  heroes: IHero[] = [];
  selectedHeroes: IHero[];
  searchLetter: string = '';
  eror: boolean = true;
  loading: boolean = false;

  private readonly heroesSubscriptionDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private heroesService: HeroesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.selectedHeroes = this.heroesService.getSelectedHeroes();
    this.inputSearchSubscriptionInit();
  }

  inputSearchSubscriptionInit(): Subscription {
    return this.searchInputText
      .pipe(
        distinctUntilChanged(this.compareNewSearchWithOldOne),
        takeUntil(this.heroesSubscriptionDestroyed$),
        switchMap(
          (heroName: string): Observable<IHero[]> => {
            const timeToWait: number =
              heroName.length > 1
                ? TIME_CONST.WAIT_FOR_NAME_QUERY
                : TIME_CONST.WAIT_FOR_LETTER_QUERY;

            return this.heroesService.searchHeroes(heroName, timeToWait).pipe(
              tap(() => this.heroesService.addNewQuery(heroName)),
              finalize(() => (this.loading = false)),
              catchError((err) => {
                this.notificationService.notify(err);
                return of(undefined);
              })
            );
          }
        )
      )
      .subscribe((heroes) => {
        this.heroes = this.setHeroes(heroes);
      });
  }

  private compareNewSearchWithOldOne = (
    prevValue: string,
    currentValue: string
  ): boolean => {
    if (prevValue === currentValue) {
      this.notificationService.notify(
        'Heyy... You can search for new ones, pal!'
      );
      this.loading = false;

      return true;
    } else {
      this.loading = true;

      return false;
    }
  };

  searchByletter(searchLetter: string): void {
    this.searchLetter = searchLetter;
    this.searchInputText.next(searchLetter);
  }

  searchHero(heroName: string): void {
    this.searchInputText.next(heroName);
  }

  setHeroes(heroes: IHero[]): IHero[] {
    const selectedHeroes: IHero[] = [...this.heroesService.getSelectedHeroes()];

    return heroes.map((hero: IHero) => {
      const oneOfSelected = selectedHeroes.find(
        ({ id }: { id: string }) => id === hero.id
      );

      return !!oneOfSelected ? { ...hero, selected: true } : hero;
    });
  }

  heroSelect(id: string): void {
    this.heroes.find((hero) => hero.id === id).selected = true;
  }

  ngOnDestroy(): void {
    this.heroesSubscriptionDestroyed$.next(true);
  }
}
