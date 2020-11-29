import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import {HomeComponent} from './home/home.component';

// Startseite wird hier festgelegt
export const allAppRoutes: Routes = [
  { path: '', component: HomeComponent }
];
