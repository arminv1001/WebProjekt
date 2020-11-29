import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApixuService} from '../apixu.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarfalselocationComponent} from '../snackbarfalselocation/snackbarfalselocation.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup = this.formBuilder.group({
    location: ['']
  });
  public weatherData: any;
  public requestType = true;

  constructor(private formBuilder: FormBuilder,
              private apixuService: ApixuService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  openSnackBar(): void {
    // Anzeige Zeit der Snackbar
    const displayTime = 5;
    this.snackBar.openFromComponent(SnackbarfalselocationComponent, {
      duration: displayTime * 1000,
    });
  }

  sendToAPIXU(formValues: any): void {
    this.apixuService
      .getWeatherForecast(formValues.location)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          this.weatherData = data;
          // Zurücksetzen für weather details anzeige
          this.requestType = true;
          // Snackbar schließen bevor der Timer abläuft
          this.snackBar.dismiss();
          if (data.success === false) {
            // Standort falsch
            console.log('Falsch');
            this.weatherData = undefined;
            this.requestType = false;
            this.openSnackBar();
          }
        }
      });
  }
}

