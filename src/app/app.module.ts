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

@NgModule({
  declarations: [AppComponent, HeroesComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [AuthService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
