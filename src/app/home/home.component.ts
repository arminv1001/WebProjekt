import {Component, OnInit} from '@angular/core';
import {ApixuService} from '../apixu.service';
import {forkJoin, Observable} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public sorted: any;

  constructor(private apixuService: ApixuService) {
  }

  // Array mit den Locatiosn für die Startseite
  public weatherDataL: string[] = ['New York', 'Paris', 'Berlin', 'Teheran', 'Shanghai', 'Tokio', 'New-Dehli', 'Mexico-City', 'Seoul'];
  public weatherDataG: any[] = [];

  public weatherDataG$: Observable<any>[] = [];

  // public daten = this.weather.sendToAPIXUAndGet(this.weatherDataL[0]);

  ngOnInit(): void {
    this.weatherDataL.forEach((fWeatherData: string, index: number) => {
      this.sendToAPIXUAndGet(this.weatherDataL[index], index);
    });

    // wait for all observables in array to finish (have a value != unknown)
    forkJoin(...this.weatherDataG$)
      .subscribe((data: any) => {
        this.sortByTemperature(data);
      });
  }

  sendToAPIXUAndGet(location: string, index: number): void {
    const obs = this.apixuService.getWeather(location);
    this.weatherDataG$[index] = obs;
  }

  private sortByTemperature(data: any): void {
    const sorted = data.sort((loca1: any, loca2: any) => {
      if (loca1.current.temperature > loca2.current.temperature) {
        return -1;
      }
      if (loca1.current.temperature < loca2.current.temperature) {
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
