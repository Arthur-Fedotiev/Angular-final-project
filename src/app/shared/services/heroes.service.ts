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
  lastSelectedHero: HeroInterface;

  private baseHeroesUrl: string =
    'https://www.superheroapi.com/api.php/1276931142665573/search/';

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

  addNewQuery(query: string): void {
    !this.succesfullQueries.includes(query) &&
      this.succesfullQueries.push(query);
    this.localStorageService.setItem(CONSTANTS.QUERIES, this.succesfullQueries);
  }

  addToSelected(selectedHero: HeroInterface): void {
    const isAlreadySelected = this.selectedHeroes.findIndex(
      (heroe) => heroe.id === selectedHero.id
    );

    isAlreadySelected >= 0
      ? this.selectedHeroes.splice(isAlreadySelected, 1)
      : this.selectedHeroes.push(selectedHero);

    this.localStorageService.setItem(
      CONSTANTS.SELECTED_HEROES,
      this.selectedHeroes
    );
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
