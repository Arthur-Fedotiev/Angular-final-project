import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IHero, IHeroDetails } from '../shared/interfaces/heroInterface';
import { IPowerUp } from '../shared/interfaces/userDataInterfaces';
import { HeroesService } from '../shared/services/heroes.service';
import { UserRecordsService } from '../shared/services/user-records.service';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.css'],
})
export class BattlePageComponent implements OnInit {
  userHero: IHero;
  opponentHero$: Observable<IHeroDetails>;
  availablePowerUps: IPowerUp[];
  appliedPowerUps: IPowerUp[] = [];

  constructor(
    private heroesService: HeroesService,
    private userRecordsService: UserRecordsService
  ) {}

  ngOnInit(): void {
    this.userHero = this.heroesService.getLastSelectedHero();
    this.opponentHero$ = this.heroesService.searchById();
    this.availablePowerUps = this.userRecordsService.powerUps.filter(
      (power) => power.usesLeft !== 0
    );
  }

  enhanceHero(powerUp: IPowerUp): void {
    const index = this.availablePowerUps.findIndex(
      ({ id }) => id === powerUp.id
    );

    this.availablePowerUps.splice(index, 1);
    this.appliedPowerUps.push(powerUp);
    this.userRecordsService.usePowerUp(powerUp.id);
  }

  isApplied(id: string): boolean {
    return !!this.appliedPowerUps.find((power) => power.id === id);
  }
}
