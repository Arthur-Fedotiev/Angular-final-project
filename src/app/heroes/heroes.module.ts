import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesSearchComponent } from './heroes-search/heroes-search.component';
import { SelectedPipe } from '../shared/pipes/selected.pipe';
import { alphabet, alphabetToken } from '../shared/providers';
import { ReusedComponentsModule } from '../reused-components.module';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    HeroesSearchComponent,
    SelectedPipe,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReusedComponentsModule,
    MaterialModule,
  ],
  providers: [{ provide: alphabetToken, useValue: alphabet }],
})
export class HeroesModule {}
