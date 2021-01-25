import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattlePageRoutingModule } from './battle-page-routing.module';
import { BattlePageComponent } from './battle-page.component';
import { BattleCardComponent } from './battle-card/battle-card.component';
import { PowerupsListComponent } from './powerups-list/powerups-list.component';
import { MaterialModule } from '../material.module';
import { ReusedComponentsModule } from '../reused-components.module';
import { BattleModalComponent } from './battle-modal/battle-modal.component';

@NgModule({
  declarations: [
    BattlePageComponent,
    BattleCardComponent,
    PowerupsListComponent,
    BattleModalComponent,
  ],
  imports: [
    CommonModule,
    BattlePageRoutingModule,
    MaterialModule,
    ReusedComponentsModule,
  ],
  entryComponents: [BattleModalComponent],
})
export class BattlePageModule {}
