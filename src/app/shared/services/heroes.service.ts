import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  IAPIResults,
  IHero,
  IHeroDetails,
  ISingleHeroAPIResponse,
  IStats,
} from '../interfaces/heroInterface';
import { catchError, map, retry, timeout } from 'rxjs/operators';
import AUTH_CONST from '../constants/authConstants';
import PROVIDERS_CONST from '../constants/providersConstants';
import { LocalStorageService } from './local-storage.service';
import randomNumber from '../utils/randomNumber';
import { BaseHeroClass } from '../classes/base-hero-class';
import { DetailedHeroClass } from '../classes/detailed-hero-class';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  succesfullQueries: string[] = this.querriesFromStorage;
  selectedHeroes: BaseHeroClass[] = this.selectedHeroesFromStorage;
  lastSelectedHero: BaseHeroClass | null = this.getLastHeroFromStorageOrNull();

  private baseHeroesUrl: string = `https://www.superheroapi.com/api.php/${AUTH_CONST.API_TOKEN}/`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private get querriesFromStorage(): string[] {
    return this.localStorageService.getItem(AUTH_CONST.QUERIES);
  }

  private get selectedHeroesFromStorage(): BaseHeroClass[] {
    return this.localStorageService.getItem(AUTH_CONST.SELECTED_HEROES);
  }

  emptyHeroesStorage(): void {
    this.succesfullQueries = [];
    this.selectedHeroes = [];
    this.lastSelectedHero = null;
  }

  getSuccessfullQueries(): string[] | [] {
    return this.succesfullQueries;
  }

  getSelectedHeroes(): BaseHeroClass[] {
    return this.selectedHeroes;
  }

  getLastSelectedHero(): BaseHeroClass {
    console.log(this.lastSelectedHero);

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

  addToSelected(selectedHero: BaseHeroClass): void {
    this.selectedHeroes.push(selectedHero);

    this.lastSelectedHero = Object.assign(
      Object.create(selectedHero),
      selectedHero
    );

    this.localStorageService.setItem(
      AUTH_CONST.SELECTED_HEROES,
      this.selectedHeroes
    );
  }

  setNewLastSelectedHero(reselectedHero: BaseHeroClass): void {
    this.lastSelectedHero = reselectedHero;
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

  private getLastHeroOrNull(heroes: BaseHeroClass[]): BaseHeroClass | null {
    return heroes.length === 0 ? null : heroes[heroes.length - 1];
  }

  private getLastHeroFromStorageOrNull(): BaseHeroClass | null {
    return !this.selectedHeroes || this.selectedHeroes.length === 0
      ? null
      : this.selectedHeroes[this.selectedHeroes.length - 1];
  }

  private lastSelectedHeroDeleted(id: string): boolean {
    return this.lastSelectedHero.id === id;
  }

  searchHeroes(
    query: string,
    waitForResponse: number
  ): Observable<BaseHeroClass[]> {
    const url = this.baseHeroesUrl + 'search/' + query.trim();

    return this.http.get<{ [results: string]: IAPIResults[] }>(url).pipe(
      timeout(waitForResponse),
      retry(1),
      map(({ results }) =>
        results.map((heroAPI) => new BaseHeroClass(heroAPI))
      ),
      catchError(this.handleError)
    );
  }

  searchById(id: string | void): Observable<DetailedHeroClass> {
    const url = id
      ? this.baseHeroesUrl + id
      : this.baseHeroesUrl +
        randomNumber(PROVIDERS_CONST.MIN_ID, PROVIDERS_CONST.MAX_ID);

    return this.http.get<ISingleHeroAPIResponse>(url).pipe(
      retry(1),
      map((heroFromAPI) => new DetailedHeroClass(heroFromAPI)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error(error.message);
    return throwError(
      'Ooops... Something bad happened, please try again later'
    );
  }

  getQueriesFromStorage(): string[] | never[] {
    return this.localStorageService.getItem(AUTH_CONST.QUERIES) || [];
  }

  static getIStats(powerIStats: IStats): Array<[string, string]> {
    return Object.entries(powerIStats);
  }
}
