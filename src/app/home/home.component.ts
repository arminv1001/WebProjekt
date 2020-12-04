import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public sorted: any;

  constructor(private apixuService: ApiService) {
  }

  // Array mit den Locatiosn für die Startseite
  public weatherDataL: string[] = ['New York', 'Paris', 'Berlin', 'Teheran', 'Shanghai', 'Tokio', 'Seoul', 'Dubai', 'Kairo', 'Mumbai', 'Los Angeles', 'Lima'];
  // Array mit den Results
  public weatherDataG: any[] = [];
  // Array mit den Results als Observable
  public weatherDataG$: Observable<any>[] = [];

  ngOnInit(): void {
    // For each durch das Location Array um die Daten anzufragen
    this.weatherDataL.forEach((fWeatherData: string, index: number) => {
      this.sendToAPIAndGet(this.weatherDataL[index], index);
    });

    // Auf die Observables warten, damit keine leeres Array sortiert wird
    forkJoin(...this.weatherDataG$)
      .subscribe((data: any) => {
        this.sortByTemperature(data);
      });
  }
  // Fragt über den Service mit der Funktion getWeather die API an
  sendToAPIAndGet(location: string, index: number): void {
    const obs = this.apixuService.getWeather(location);
    this.weatherDataG$[index] = obs;
  }
  // Sortiert nach der Temperatur
  private sortByTemperature(data: any): void {
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

  public goToFlight(locationSend: string): void {
    window.location.href = 'https://google.de/search?q=stuttgart+nach+' + locationSend;
  }
}
