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

  private baseHeroesUrl: string = `https://www.superheroapi.com/api.php/${AUTH_CONST.API_TOKEN}/`;

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
    this.lastSelectedHero = null;
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

  private transformHeroesListResponse(response: IAPIResults): IHero {
    return {
      id: response.id,
      name: response.name,
      powerstats: response.powerstats,
      url: response.image.url,
      selected: false,
    };
  }

  private transformSingleHeroResponse(
    apiResponse: ISingleHeroAPIResponse
  ): IHeroDetails {
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      powerstats: apiResponse.powerstats,
      url: apiResponse.image.url,
      fullName: apiResponse.biography['full-name'],
      firstAppeared: apiResponse.biography['first-appearance'],
      gender: apiResponse.appearance.gender,
      height: apiResponse.appearance.height[1],
      race: apiResponse.appearance.race,
      belongesTo: apiResponse.connections['group-affiliation'],
      relatives: apiResponse.connections.relatives,
    };
  }

  searchHeroes(query: string): Observable<IHero[]> {
    const url = this.baseHeroesUrl + 'search/' + query.trim();

    return this.http.get<Record<string, []>>(url).pipe(
      retry(1),
      map(({ results }) => results.map(this.transformHeroesListResponse)),
      catchError(this.handleError)
    );
  }

  searchById(id: string): Observable<IHeroDetails> {
    const url = this.baseHeroesUrl + id;

    return this.http
      .get<ISingleHeroAPIResponse>(url)
      .pipe(
        retry(1),
        map(this.transformSingleHeroResponse),
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
