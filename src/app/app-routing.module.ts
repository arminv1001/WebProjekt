import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherComponent} from './weather/weather.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
