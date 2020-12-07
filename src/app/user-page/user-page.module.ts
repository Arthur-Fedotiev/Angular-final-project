import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [UserPageComponent],
  imports: [CommonModule, UserPageRoutingModule, MaterialModule],
})
export class UserPageModule {}
