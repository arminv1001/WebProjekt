import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherComponent} from './weather/weather.component';
import {HomeComponent} from './home/home.component';
// Hier werden alle internen Pfade erstellt bzw angegeben
const routes: Routes = [
  {
    // Weather Seite
    path: 'weather',
    component: WeatherComponent
  },
  {
    // Home Seite
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
