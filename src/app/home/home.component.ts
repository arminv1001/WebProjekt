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

    //   const test1: any = this.weatherDataG[0];
    //   // const test2: any = test1['current'];
    //   console.log(this.weatherDataG[0].current.temperature);
    //   tempory = this.weatherDataG.sort((loca1, loca2) => {
    //     if (loca1.current.temperature > loca2.current.temperature) {
    //       return 1;
    //     }
    //     if (loca1.current.temperature < loca2.current.temperature) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    //   console.log(tempory[0]?.current.temperature);
    //   console.log(tempory);
    //   tempory = tempory.sort((loca1: any, loca2: any) => {
    //     console.log('asdasd');
    //     if (loca1.current.temperature > loca2.current.temperature) {
    //       return 1;
    //     }
    //     if (loca1.current.temperature < loca2.current.temperature) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    //   console.log(tempory);
    //   this.weatherDataG = tempory;
    // }
    //
    // compareTemp(location1: any, location2: any): number {
    //   const temp1 = location1.current.temperature;
    //   const temp2 = location2.current.temperature;
    //   console.log('ss');
    //   if (temp1 < temp2) {
    //     return -1;
    //   }
    //   if (temp1 > temp2) {
    //     return 1;
    //   }
    //   return 0;
  }

  sendToAPIXUAndGet(location: string, index: number): void {
    const obs = this.apixuService.getWeather(location);
    this.weatherDataG$[index] = obs;
    // response.subscribe((data: any) => this.weatherDataG[counter] = data);
    // return this.weatherDataG[counter];
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
