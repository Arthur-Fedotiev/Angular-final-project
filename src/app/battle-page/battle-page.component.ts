import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, take, takeUntil } from 'rxjs/operators';
import {
  IHero,
  IHeroDetails,
  IStats,
} from '../shared/interfaces/heroInterface';
import {
  IBattleRecord,
  IPowerUp,
} from '../shared/interfaces/userDataInterfaces';
import { HeroesService } from '../shared/services/heroes.service';
import { NotificationService } from '../shared/services/notification.service';
import { UserRecordsService } from '../shared/services/user-records.service';
import { BattleModalComponent } from './battle-modal/battle-modal.component';
import NOTIFY from '../shared/constants/notifications';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.css'],
})
export class BattlePageComponent implements OnInit {
  simulateBattle$ = new BehaviorSubject(false);
  simulateBattle = this.simulateBattle$.asObservable();

  userHero: IHero;
  opponentHero: IHeroDetails;
  availablePowerUps: IPowerUp[];
  appliedPowerUps: IPowerUp[];
  enhanced: string[];
  enhancement: number = 0;

  private readonly battlePageSubscriptionDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private heroesService: HeroesService,
    private userRecordsService: UserRecordsService,
    private notificationService: NotificationService,
    private modal: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userHero = this.heroesService.getLastSelectedHero();
    this.getOpponentsHero();
    this.getAvailablePowerUps();
    this.appliedPowerUps = [];
    this.enhanced = [];
  }

  getOpponentsHero(): void {
    this.heroesService
      .searchById()
      .pipe(takeUntil(this.battlePageSubscriptionDestroyed$))
      .subscribe(
        (APIresponse: IHeroDetails) => {
          this.opponentHero = APIresponse;
        },
        () => this.notificationService.notify(NOTIFY.BAD_RESPONSE)
      );
  }

  getAvailablePowerUps(): void {
    this.availablePowerUps = this.userRecordsService.powerUps.filter(
      (power) => power.usesLeft !== 0
    );
  }

  enhanceHero(powerUp: IPowerUp): void {
    const index = this.availablePowerUps.findIndex(
      ({ id }) => id === powerUp.id
    );

    this.enhancement = this.enhancement + 10;
    this.enhanced.push(powerUp.id);
    this.availablePowerUps.splice(index, 1);
    this.appliedPowerUps.push(powerUp);
    this.userRecordsService.usePowerUp(powerUp.id);
  }

  getStats(powerStats: IStats): number {
    return Object.keys(powerStats).reduce((acc, stat) => {
      return acc + +powerStats[stat];
    }, 0);
  }

  getWinner(): void {
    this.simulateBattle$.next(true);

    const userStats =
      this.getStats(this.userHero.powerstats) + this.enhancement;
    const opponentStats = this.getStats(this.opponentHero.powerstats);
    const result = userStats > opponentStats ? 'Victory' : 'Defeat';
    const newBattleRecord: IBattleRecord = {
      date: Date.now(),
      heroName: this.userHero.name,
      heroId: this.userHero.id,
      opponentName: this.opponentHero.name,
      opponentId: this.opponentHero.id,
      result: result,
    };
    this.userRecordsService.addNewBattleRecord(newBattleRecord);
    this.simulateBattle.pipe(delay(4000), take(1)).subscribe(() => {
      this.openBattleModal(result);
      this.simulateBattle$.next(false);
    });
  }

  fightIsUnderway() {
    this.simulateBattle.subscribe();
  }

  isApplied(id: string): boolean {
    return !!this.appliedPowerUps.find((power) => power.id === id);
  }

  openBattleModal(result: string): void {
    const modalRef = this.modal.open(BattleModalComponent, {
      width: '400px',
      data: { result },
    });

    modalRef
      .afterClosed()
      .pipe(takeUntil(this.battlePageSubscriptionDestroyed$))
      .subscribe((action) => {
        action === 'back'
          ? this.router.navigateByUrl('/user')
          : this.ngOnInit();
      });
  }

  ngOnDestroy(): void {
    this.battlePageSubscriptionDestroyed$.next(true);
  }
}
