import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HeroAPIResponse, HeroInterface } from '../interfaces/heroInterface';
import { catchError, map, retry } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseHeroesUrl: string =
    'https://www.superheroapi.com/api.php/1276931142665573/search/';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  private transformResponse(response: any): HeroInterface {
    return {
      id: response.id,
      name: response.name,
      powerstats: response.powerstats,
      url: response.image.url,
    };
  }

  searchHeroes(query: string): Observable<HeroAPIResponse> {
    const url = this.baseHeroesUrl + query.trim();

    return this.http.get<any>(url).pipe(
      retry(3),
      map(({ results }) => results.map(this.transformResponse)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }
}
