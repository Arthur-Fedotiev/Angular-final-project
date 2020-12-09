import { Injectable } from '@angular/core';
import { IBattleRecord, IPowerUp } from '../interfaces/userDataInterfaces';
import { powerUps, battleHistory } from '../utils/mockData';
import AUTH_CONST from '../constants/authConstants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserRecordsService {
  powerUps: IPowerUp[] = this.powerUpsFromStorage;
  battleHistory: IBattleRecord[] = this.battleRecordsFromStorage;

  constructor(private localStorageService: LocalStorageService) {}

  private get powerUpsFromStorage(): IPowerUp[] {
    return this.localStorageService.getItem(AUTH_CONST.POWERUPS);
  }

  private get battleRecordsFromStorage(): IBattleRecord[] {
    return this.localStorageService.getItem(AUTH_CONST.BATTLE_HISTORY);
  }

  getPowerUps(): IPowerUp[] {
    return this.powerUps;
  }

  getBattleHistory() {
    return this.battleHistory;
  }

  restoreDefaultUserRecords(): void {
    this.powerUps = powerUps;
    this.battleHistory = battleHistory;
  }
}
