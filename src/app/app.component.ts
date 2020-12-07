import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { shareReplay } from 'rxjs/operators';
import { UsersService } from './shared/services/users.service';
import { HeroesService } from './shared/services/heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-superhero-project';

  isActiveSession$ = this.authService.isActiveSession$.pipe(shareReplay(1));

  ngOnInit() {
    !UsersService.isLocalStorageexists() &&
      this.usersService.setEmptyLocalStoage();
  }
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private heroesService: HeroesService
  ) {}

  logout() {
    this.authService.logout();
    this.heroesService.emptyHeroesStorage();
  }
}
