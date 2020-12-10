import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IStats } from '../shared/interfaces/heroInterface';
import { HeroesService } from '../shared/services/heroes.service';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.css'],
})
export class HeroInfoComponent implements OnInit {
  id: string;
  hero$;

  private readonly heroInfoSubscriptionDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.heroInfoSubscriptionDestroyed$))
      .subscribe((paramMap) => this.getHero(paramMap.get('id')));
  }

  getHero(id: string): void {
    this.hero$ = this.heroesService.searchById(id);
  }

  getPowerStats(powerIStats: IStats): Array<[string, string]> {
    return HeroesService.getIStats(powerIStats);
  }

  ngOnDestroy(): void {
    this.heroInfoSubscriptionDestroyed$.next(true);
  }
}
