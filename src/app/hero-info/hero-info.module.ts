import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroInfoRoutingModule } from './hero-info-routing.module';
import { MaterialModule } from '../material.module';
import { HeroInfoComponent } from './hero-info.component';
import { ReusedComponentsModule } from '../reused-components.module';

@NgModule({
  declarations: [HeroInfoComponent],
  imports: [
    CommonModule,
    HeroInfoRoutingModule,
    MaterialModule,
    ReusedComponentsModule,
  ],
})
export class HeroInfoModule {}
