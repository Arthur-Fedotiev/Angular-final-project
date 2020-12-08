import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HeroInterface } from '../interfaces/heroInterface';
import { catchError, map, retry } from 'rxjs/operators';
import CONSTANTS from '../constants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  succesfullQueries: string[] = this.localStorageService.getItem(
    CONSTANTS.QUERIES
  );
  selectedHeroes: HeroInterface[] = this.localStorageService.getItem(
    CONSTANTS.SELECTED_HEROES
  );
  lastSelectedHero: HeroInterface | null = this.getLastHeroFromStorageOrNull();

  private baseHeroesUrl: string = `https://www.superheroapi.com/api.php/${CONSTANTS.API_TOKEN}/search/`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  emptyHeroesStorage(): void {
    this.succesfullQueries = [];
    this.selectedHeroes = [];
  }

  getSuccessfullQueries(): string[] | [] {
    return this.succesfullQueries;
  }

  getSelectedHeroes(): HeroInterface[] {
    return this.selectedHeroes;
  }

  getLastSelectedHero(): HeroInterface {
    return this.lastSelectedHero;
  }

  addNewQuery(query: string): void {
    !this.succesfullQueries.includes(query) &&
      this.succesfullQueries.push(query);
    this.localStorageService.setItem(CONSTANTS.QUERIES, this.succesfullQueries);
  }

  addToSelected(selectedHero: HeroInterface): void {
    this.selectedHeroes.push(selectedHero);
    this.lastSelectedHero = { ...selectedHero };

    this.localStorageService.setItem(
      CONSTANTS.SELECTED_HEROES,
      this.selectedHeroes
    );
  }

  removeFromSelected(id: string): void {
    const index = this.selectedHeroes.findIndex((hero) => hero.id === id);

    this.selectedHeroes.splice(index, 1);
    this.localStorageService.setItem(
      CONSTANTS.SELECTED_HEROES,
      this.selectedHeroes
    );

    if (this.lastSelectedHeroDeleted(id)) {
      this.lastSelectedHero = this.getLastHeroOrNull(this.selectedHeroes);
      console.log(this.lastSelectedHero);
    }
  }

  private transformResponse(response: any): HeroInterface {
    return {
      id: response.id,
      name: response.name,
      powerstats: response.powerstats,
      url: response.image.url,
      selected: false,
    };
  }

  private getLastHeroOrNull(heroes: HeroInterface[]): HeroInterface | null {
    return heroes.length === 0 ? null : heroes[heroes.length - 1];
  }

  private getLastHeroFromStorageOrNull(): HeroInterface | null {
    return this.selectedHeroes.length === 0
      ? null
      : this.selectedHeroes[this.selectedHeroes.length - 1];
  }

  private lastSelectedHeroDeleted(id: string): boolean {
    return this.lastSelectedHero.id === id;
  }

  searchHeroes(query: string): Observable<HeroInterface[]> {
    const url = this.baseHeroesUrl + query.trim();

    return this.http.get<Record<string, []>>(url).pipe(
      retry(1),
      map(({ results }) => results.map(this.transformResponse)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }

  getQueriesFromStorage(): string[] | any[] {
    return this.localStorageService.getItem(CONSTANTS.QUERIES) || [];
  }
}
