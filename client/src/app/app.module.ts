// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// 3rd Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Pages
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.component';
import { SettingsPageComponent } from './pages/settings/settings.component';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoadingComponent } from './components/loading/loading.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Service
import { AppService } from './app.service';

@NgModule({
    imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    NgbModule.forRoot(),
    NgxChartsModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    SettingsPageComponent,

    NavbarComponent,
    DatepickerComponent,
    CalendarComponent,
    LoadingComponent
  ],

  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
