import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home.component';
import { SettingsPageComponent } from './pages/settings/settings.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
