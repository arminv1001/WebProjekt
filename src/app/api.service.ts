import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Hier befindet sich die Schnittstelle zur API.
  // Es ist möglich das die Free-Version "ausläuft" hinsichtlich der Anfragen.
  // Ich bitte Sie dann den key zu ändern

  constructor(private http: HttpClient) {
  }
  private key = '&appid=8c7ac885c73b13ac8deb1f25ed1508b5';
  // Current Weather anfrage
  getWeather(location: string): Observable<any> {
    console.log(location);
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' + location + this.key
    );
  }
  // Forecast Daten
  getWeatherForecast(koordi: {lon: number, lat: number}): Observable<any> {
    return this.http.get(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + koordi.lat.toString() + '&lon=' + koordi.lon.toString() + this.key
      );
    }
}
