import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IHero } from '../shared/interfaces/heroInterface';
import { HeroesService } from '../shared/services/heroes.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
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
  }

  searchByletter(searchLetter: string): void {
    console.log(searchLetter);
    this.searchLetter = searchLetter;
    this.searchHero(searchLetter);
  }

  searchHero(heroName: string): void {
    this.loading = true;
    this.heroesService
      .searchHeroes(heroName)
      .pipe(takeUntil(this.heroesSubscriptionDestroyed$))
      .subscribe(
        (heroes) => {
          this.heroes = this.setHeroes(heroes);
          this.heroesService.addNewQuery(heroName);
          this.eror = false;
        },
        (error) => {
          this.eror = true;
          this.loading = false;
          this.notificationService.notify(error);
        },
        () => (this.loading = false)
      );
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
    const indexOfSelected = this.heroes.findIndex((hero) => hero.id === id);

    this.heroes[indexOfSelected].selected = true;
  }

  ngOnDestroy(): void {
    this.heroesSubscriptionDestroyed$.next(true);
  }
}
