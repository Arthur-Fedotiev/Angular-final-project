import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattlePageRoutingModule } from './battle-page-routing.module';
import { BattlePageComponent } from './battle-page.component';
import { BattleCardComponent } from './battle-card/battle-card.component';
import { PowerupsListComponent } from './powerups-list/powerups-list.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    BattlePageComponent,
    BattleCardComponent,
    PowerupsListComponent,
  ],
  imports: [CommonModule, BattlePageRoutingModule, MaterialModule],
})
export class BattlePageModule {}
