import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { BattleResults } from '../shared/enums';
import { IResultsOfBattle } from '../shared/interfaces/battleInterfaces';

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
  private getInitialState(): void {
    this.userHero = this.heroesService.getLastSelectedHero();
    this.getOpponentsHero();
    this.getAvailablePowerUps();
    this.appliedPowerUps = [];
    this.enhanced = [];
  }

  constructor(
    private heroesService: HeroesService,
    private userRecordsService: UserRecordsService,
    private notificationService: NotificationService,
    private modal: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInitialState();
  }

  private getOpponentsHero(): void {
    this.heroesService
      .searchById()
      .pipe(takeUntil(this.battlePageSubscriptionDestroyed$))
      .subscribe(
        (APIresponse: IHeroDetails) => {
          this.opponentHero = APIresponse;
          console.log(this.opponentHero);
        },
        () => this.notificationService.notify(NOTIFY.BAD_RESPONSE)
      );
  }

  private getAvailablePowerUps(): void {
    this.availablePowerUps = this.userRecordsService.powerUps.filter(
      (power) => power.usesLeft !== 0
    );
  }

  private getStats(powerStats: IStats): number {
    return Object.keys(powerStats).reduce((acc, stat) => {
      return acc + +powerStats[stat];
    }, 0);
  }

  private saveNewBattleRecord({
    userHero,
    opponentHero,
    result,
  }: IResultsOfBattle): void {
    const newBattleRecord: IBattleRecord = {
      date: Date.now(),
      heroName: userHero.name,
      heroId: userHero.id,
      opponentName: opponentHero.name,
      opponentId: opponentHero.id,
      result: result,
    };

    this.userRecordsService.addNewBattleRecord(newBattleRecord);
  }
  private getResultsOfFight(): string {
    const userStats: number =
      this.getStats(this.userHero.powerstats) + this.enhancement;
    const opponentStats: number = this.getStats(this.opponentHero.powerstats);

    return userStats > opponentStats ? BattleResults.Win : BattleResults.Loose;
  }

  private openBattleModal(result: string): void {
    const modalRef: MatDialogRef<
      BattleModalComponent,
      string
    > = this.modal.open(BattleModalComponent, {
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

  enhanceHero(powerUp: IPowerUp): void {
    const index: number = this.availablePowerUps.findIndex(
      ({ id }) => id === powerUp.id
    );

    this.enhancement = this.enhancement + 10;
    this.enhanced.push(powerUp.id);
    this.availablePowerUps.splice(index, 1);
    this.appliedPowerUps.push(powerUp);
    this.userRecordsService.usePowerUp(powerUp.id);
  }

  getWinner(): void {
    this.simulateBattle$.next(true);

    const result: string = this.getResultsOfFight();
    const dataForNewRecord: IResultsOfBattle = {
      userHero: this.userHero,
      opponentHero: this.opponentHero,
      result,
    };

    this.saveNewBattleRecord(dataForNewRecord);
    this.simulateBattle.pipe(delay(4000), take(1)).subscribe(() => {
      this.openBattleModal(result);
      this.simulateBattle$.next(false);
    });
  }

  isApplied(id: string): boolean {
    return !!this.appliedPowerUps.find((power) => power.id === id);
  }

  ngOnDestroy(): void {
    this.battlePageSubscriptionDestroyed$.next(true);
  }
}
