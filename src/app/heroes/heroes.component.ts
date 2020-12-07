import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeroInterface } from '../shared/interfaces/heroInterface';
import { alphabetToken } from '../shared/providers';
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
  selectedHeroes: HeroInterface[];
  searchLetter: string = 'A';
  showSortPanel: boolean = false;
  eror: boolean = true;
  loading: boolean = false;

  constructor(
    private heroesService: HeroesService,
    private notificationService: NotificationService,
    @Inject(alphabetToken) public alphabet
  ) {}

  ngOnInit(): void {
    this.selectedHeroes = this.heroesService.getSelectedHeroes();
  }

  toggleSortPanel(): void {
    this.showSortPanel = !this.showSortPanel;
  }

  changesearchLetter(letter: string): void {
    this.searchLetter = letter;
    this.toggleSortPanel();
    this.searchHero(letter);
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
