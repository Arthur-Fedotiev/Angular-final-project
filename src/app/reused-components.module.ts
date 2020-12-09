import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HeroCardComponent } from './shared/common/hero-card/hero-card.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [HeroCardComponent],
  exports: [HeroCardComponent],
})
export class ReusedComponentsModule {}
