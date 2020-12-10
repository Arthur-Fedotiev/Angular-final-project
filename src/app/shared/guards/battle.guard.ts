import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import NOTIFY_CONST from '../constants/notifications';
import { HeroesService } from '../services/heroes.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class BattleGuard implements CanActivate {
  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const selectedHeroExists = !!this.heroesService.getLastSelectedHero();
    if (selectedHeroExists) {
      return true;
    } else {
      this.notificationService.notify(NOTIFY_CONST.NO_SELECTED_HERO);
      this.router.navigateByUrl('/heroes');
    }
  }
}
