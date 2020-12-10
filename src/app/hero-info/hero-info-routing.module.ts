import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroInfoComponent } from './hero-info.component';

const routes: Routes = [{ path: '', component: HeroInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroInfoRoutingModule {}
