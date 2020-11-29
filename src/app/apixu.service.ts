import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) {}

  getWeather(location: string): Observable<any> {
    console.log(location);
    return this.http.get(
      'http://api.weatherstack.com/current?access_key=51e53a0308ac192abef17f919a7b606d&query=' + location
    );
  }

  getWeatherForecast(location: string): Observable<any> {
    console.log(location);
    return this.http.get(
      'http://api.weatherstack.com/current?access_key=51e53a0308ac192abef17f919a7b606d&query=' + location + '&forecast_days=1&hourly=1'
    );
  }
}
