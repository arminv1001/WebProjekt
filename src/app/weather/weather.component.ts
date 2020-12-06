import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarfalselocationComponent} from '../snackbarfalselocation/snackbarfalselocation.component';

// Weather - Seite
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})

export class WeatherComponent implements OnInit {

  // Inhalt des Eingabefeldes, in welche die Location eingegeben werden soll
  public weatherSearchForm: FormGroup = this.formBuilder.group({
    location: ['']
  });
  // Current weather data
  public weatherData: any;
  // Forecastdaten als Observable
  public weatherDataForecast$: any;
  // Forecastdaten daily
  public weatherDataDaily: any;

  // formBuilder -> Eingabefeld Inhalt (Location Eingabe)
  // apiService -> API
  // snackbar -> Popup falls Location nicht gefunden wurden bzw. die Eingabe falsch war
  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  // Wird geöffnet, wenn die Location Eingabe ungültig war (Popup)
  openSnackBar(): void {
    // Anzeige Zeit der Snackbar
    const displayTime = 5;
    // Weiterleitung an das entsprechende Component
    this.snackBar.openFromComponent(SnackbarfalselocationComponent, {
      duration: displayTime * 1000,
    });
  }

  // Als erstes wird  eine Anfrage an die API gesendet,
  // um die aktuellen Daten zu erlang und daraus die Koordinaten der gewünschten Stadt herauszufinden.
  // Die zweite Anfrage enthält die Forecast-Daten und kann ausschließlich nur mit den Koordinaten der Stadt erlangt werden
  sendToAPI(formValues: any): void {
    // Anfrage für das aktuelle Wetter um lat und lon zu erhalten
    this.apiService.getWeather(formValues.location)
      .subscribe((data: any) => {
        if (data) {
          this.weatherData = data;
          // Forecast Daten anfragen
          this.apiService.getWeatherForecast(data.coord).subscribe((dataForecast) => {
            if (dataForecast) {
              // Aus dem JSON wird nur das Array mit den Daily Forecast Daten übernommen
              this.weatherDataDaily = dataForecast.daily;
              // Snackbar schließen, falls es noch offen sein sollte
              this.snackBar.dismiss();
            }
          }, (err) => {
            // Fehler
            console.log(err);
            this.weatherDataForecast$ = undefined;
            this.weatherDataDaily = undefined;
            this.weatherData = undefined;
            // Snackbar öffnen
            this.openSnackBar();
          });
        }
      }, (error) => {
        // Falsche Eingabe
        this.weatherDataForecast$ = undefined;
        this.weatherDataDaily = undefined;
        this.weatherData = undefined;
        // Snackabr öffnen - da Location nicht gefunden wurde
        this.openSnackBar();
      });
  }

  // UNIX Daten werden in ein Date Format gebracht für die Anzeige
  convertUnixToDate(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString('de');
  }

  // Temperatur runden auf ganz Zahl
  public roundit(numbertoRound: number): number {
    return Math.round(numbertoRound);
  }
}




