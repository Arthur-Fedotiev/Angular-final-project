import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HeroCardComponent } from './shared/common/hero-card/hero-card.component';
import { AlphabeticalSearchComponent } from './shared/common/alphabetical-search/alphabetical-search.component';
import { alphabet, alphabetToken } from './shared/providers';
import { RouterModule } from '@angular/router';
import { PowerstatsComponent } from './shared/common/powerstats/powerstats.component';
import { OverlaySpinnerComponent } from './shared/common/overlay-spinner/overlay-spinner.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [
    HeroCardComponent,
    AlphabeticalSearchComponent,
    PowerstatsComponent,
    OverlaySpinnerComponent,
  ],
  exports: [
    HeroCardComponent,
    AlphabeticalSearchComponent,
    PowerstatsComponent,
    OverlaySpinnerComponent,
  ],
  providers: [{ provide: alphabetToken, useValue: alphabet }],
})
export class ReusedComponentsModule {}
