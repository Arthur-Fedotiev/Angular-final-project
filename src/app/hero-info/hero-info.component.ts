import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.css'],
})
export class HeroInfoComponent implements OnInit {
  id: string;

  private readonly heroInfoSubscriptionDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.heroInfoSubscriptionDestroyed$))
      .subscribe((paramMap) => (this.id = paramMap.get('id')));
  }

  ngOnDestroy(): void {
    this.heroInfoSubscriptionDestroyed$.next(true);
  }
}
