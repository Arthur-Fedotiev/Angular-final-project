import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';

import { MaterialModule } from '../material.module';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { BattleHistoryComponent } from './battle-history/battle-history.component';

@NgModule({
  declarations: [UserPageComponent, HeroesListComponent, BattleHistoryComponent],
  imports: [CommonModule, UserPageRoutingModule, MaterialModule],
})
export class UserPageModule {}
