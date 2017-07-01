// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 3rd Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Pages
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.component';
import { SettingsPageComponent } from './pages/settings/settings.component';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { CalendarComponent } from './components/calendar/calendar.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SettingsPageComponent,

    NavbarComponent,
    DatepickerComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
