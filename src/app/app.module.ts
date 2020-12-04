import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//----------Routing
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { HeroesComponent } from './heroes/heroes.component';
import { NotificationService } from './shared/services/notification.service';
import { UsersService } from './shared/services/users.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [AuthService, NotificationService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
