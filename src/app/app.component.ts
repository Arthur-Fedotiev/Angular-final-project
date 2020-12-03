import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { shareReplay } from 'rxjs/operators';
import { UsersService } from './shared/services/users.service';

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
    private usersService: UsersService
  ) {}

  logout() {
    this.authService.logout();
  }
}
