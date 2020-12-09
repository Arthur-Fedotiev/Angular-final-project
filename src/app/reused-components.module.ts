import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HeroCardComponent } from './shared/common/hero-card/hero-card.component';
import { AlphabeticalSearchComponent } from './shared/common/alphabetical-search/alphabetical-search.component';
import { alphabet, alphabetToken } from './shared/providers';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [HeroCardComponent, AlphabeticalSearchComponent],
  exports: [HeroCardComponent, AlphabeticalSearchComponent],
  providers: [{ provide: alphabetToken, useValue: alphabet }],
})
export class ReusedComponentsModule {}
