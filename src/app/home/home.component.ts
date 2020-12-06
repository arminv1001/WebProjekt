import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {forkJoin, Observable} from 'rxjs';
// Home-Seite
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  // In sorted befinden sich die erhaltenen Daten für die einzelnen Locations, sortiert nach der Temperatur
  public sorted: any;
  // apiService - "Verbindung" zur Klasse api.service.ts
  constructor(private apiService: ApiService) {
  }

  // Array mit den Locations für die Startseite
  public weatherDataL: string[] = ['New York', 'Paris', 'Berlin', 'Teheran', 'Shanghai', 'Tokio', 'Seoul', 'Dubai', 'Kairo', 'Mumbai', 'Los Angeles', 'Lima'];
  // Array mit den Results
  public weatherDataG: any[] = [];
  // Array mit den Results als Observable
  public weatherDataG$: Observable<any>[] = [];

  ngOnInit(): void {
    // For each durch das Location Array um die Daten einzeln anzufragen
    this.weatherDataL.forEach((fWeatherData: string, index: number) => {
      this.sendToAPIAndGet(this.weatherDataL[index], index);
    });

    // Das forkJoin() sorgt dafür, dass gewartet wird, bis alle Daten von der API ankamen, damit kein leeres Array sortiert wird
    forkJoin(...this.weatherDataG$)
      .subscribe((data: any) => {
        this.sortByTemperature(data);
      });
  }

  // Fragt über den Service api.service.ts mit der Funktion getWeather die API an
  // und speichert das zurückgelieferte Observable in weatherData$
  // index -> wird benötigt, damit die Daten in der gleichen Rheinfolge im Array liegen
  // location -> Location
  sendToAPIAndGet(location: string, index: number): void {
    const obs = this.apiService.getWeather(location);
    this.weatherDataG$[index] = obs;
  }

  // Sortiert nach der Temperatur (von groß nach klein)
  // Übergeben wird hier ein Array mit den Daten für die jeweiligen Locations, welche  schon "subscribe" wurden
  private sortByTemperature(data: any): void {
    // Die sort() Funktion muss vorher "angepasst" werden an unseren Use-Case
    const sorted = data.sort((loca1: any, loca2: any) => {
      if (loca1.main.temp > loca2.main.temp) {
        return -1;
      }
      if (loca1.main.temp < loca2.main.temp) {
        return 1;
      }
      return 0;
    });

    this.sorted = sorted;
  }

  // Weiterleitung, wenn der Button 'Book flight' betätigt wurde
  // Übergabe der location, auf der geklickt wurde
  public goToFlight(locationSend: string): void {
    window.location.href = 'https://google.de/search?q=stuttgart+nach+' + locationSend;
  }
  // Temperatur runden auf ganz Zahl
  public roundit(numbertoRound: number): number {
    return Math.round(numbertoRound);
  }
}
