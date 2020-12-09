import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IAPIResults, IHero, IStats } from '../interfaces/heroInterface';
import { catchError, map, retry } from 'rxjs/operators';
import AUTH_CONST from '../constants/authConstants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  succesfullQueries: string[] = this.querriesFromStorage;
  selectedHeroes: IHero[] = this.selectedHeroesFromStorage;
  lastSelectedHero: IHero | null = this.getLastHeroFromStorageOrNull();

  private baseHeroesUrl: string = `https://www.superheroapi.com/api.php/${AUTH_CONST.API_TOKEN}/search/`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private get querriesFromStorage(): string[] {
    return this.localStorageService.getItem(AUTH_CONST.QUERIES);
  }

  private get selectedHeroesFromStorage(): IHero[] {
    return this.localStorageService.getItem(AUTH_CONST.SELECTED_HEROES);
  }

  emptyHeroesStorage(): void {
    this.succesfullQueries = [];
    this.selectedHeroes = [];
  }

  getSuccessfullQueries(): string[] | [] {
    return this.succesfullQueries;
  }

  getSelectedHeroes(): IHero[] {
    return this.selectedHeroes;
  }

  getLastSelectedHero(): IHero {
    return this.lastSelectedHero;
  }

  addNewQuery(query: string): void {
    !!this.succesfullQueries && this.succesfullQueries.length === 0
      ? this.succesfullQueries.push(query)
      : !this.succesfullQueries.includes(query) &&
        this.succesfullQueries.push(query);

    this.localStorageService.setItem(
      AUTH_CONST.QUERIES,
      this.succesfullQueries
    );
  }

  addToSelected(selectedHero: IHero): void {
    this.selectedHeroes.push(selectedHero);
    this.lastSelectedHero = { ...selectedHero };
    this.localStorageService.setItem(
      AUTH_CONST.SELECTED_HEROES,
      this.selectedHeroes
    );
  }

  removeFromSelected(id: string): void {
    const index = this.selectedHeroes.findIndex((hero) => hero.id === id);

    this.selectedHeroes.splice(index, 1);
    this.localStorageService.setItem(
      AUTH_CONST.SELECTED_HEROES,
      this.selectedHeroes
    );

    if (this.lastSelectedHeroDeleted(id)) {
      this.lastSelectedHero = this.getLastHeroOrNull(this.selectedHeroes);
    }
  }

  private transformResponse(response: IAPIResults): IHero {
    return {
      id: response.id,
      name: response.name,
      powerstats: response.powerstats,
      url: response.image.url,
      selected: false,
    };
  }

  private getLastHeroOrNull(heroes: IHero[]): IHero | null {
    return heroes.length === 0 ? null : heroes[heroes.length - 1];
  }

  private getLastHeroFromStorageOrNull(): IHero | null {
    return !this.selectedHeroes || this.selectedHeroes.length === 0
      ? null
      : this.selectedHeroes[this.selectedHeroes.length - 1];
  }

  private lastSelectedHeroDeleted(id: string): boolean {
    return this.lastSelectedHero.id === id;
  }

  searchHeroes(query: string): Observable<IHero[]> {
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
    return this.localStorageService.getItem(AUTH_CONST.QUERIES) || [];
  }

  static getIStats(powerIStats: IStats): Array<[string, string]> {
    return Object.entries(powerIStats);
  }
}
