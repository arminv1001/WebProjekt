import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarfalselocationComponent} from '../snackbarfalselocation/snackbarfalselocation.component';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup = this.formBuilder.group({
    location: ['']
  });
  // Current weather data
  public weatherData: any;
  // Forecastdaten als Observable
  public weatherDataForecast$: any;
  // Forecastdaten gefilter nur nach den daily Daten
  public weatherDataDaily: any;


  constructor(private formBuilder: FormBuilder,
              private apixuService: ApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }
  // Wird geöffnet, wenn die Location eingabe ungültig war
  openSnackBar(): void {
    // Anzeige Zeit der Snackbar
    console.log('Snackbar');
    const displayTime = 5;
    // Weiterleitung an das entsprechende Component
    this.snackBar.openFromComponent(SnackbarfalselocationComponent, {
      duration: displayTime * 1000,
    });
  }
   // Sendet eine Anfrage an die API, um daraus die Koordinaten des Standortes herauszufinden.
   // Die zweite Anfrage enthält die Forecast-Daten
   sendToAPI(formValues: any): void {
    // Anfrage für lat und lon
    this.apixuService.getWeather(formValues.location)
      .subscribe((data: any) => {
        console.log(data);
        if (data){
          this.weatherData = data;
          // Forecast Daten
          this.apixuService.getWeatherForecast(data.coord).subscribe((dataForecast) => {
            console.log(dataForecast);
            if (dataForecast) {
              this.weatherDataDaily = dataForecast.daily;
              this.snackBar.dismiss();
            }}, (err) => {
              console.log(err);
              this.weatherDataForecast$ = undefined;
              this.weatherDataDaily = undefined;
              this.weatherData = undefined;
              this.openSnackBar();
            });
          }}, (error) => {
            console.log('FEHLER');
            this.weatherDataForecast$ = undefined;
            this.weatherDataDaily = undefined;
            this.weatherData = undefined;
            this.openSnackBar();
      });

  }
  // UNIX Daten werden in Date Format gebracht für die Anzeige
  convertUnixToDate(unixTime: number): string{
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString('de');
  }
}




