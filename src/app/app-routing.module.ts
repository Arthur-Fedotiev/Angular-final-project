import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { BattleGuard } from './shared/guards/battle.guard';

const routes: Routes = [
  {
    path: 'heroes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./heroes/heroes.module').then((module) => module.HeroesModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user-page/user-page.module').then(
        (module) => module.UserPageModule
      ),
  },
  {
    path: 'battle',
    canActivate: [AuthGuard, BattleGuard],
    loadChildren: () =>
      import('./battle-page/battle-page.module').then(
        (module) => module.BattlePageModule
      ),
  },
  {
    path: 'hero-info/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./hero-info/hero-info.module').then(
        (module) => module.HeroInfoModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((module) => module.LoginModule),
  },
  { path: '**', redirectTo: '/heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
