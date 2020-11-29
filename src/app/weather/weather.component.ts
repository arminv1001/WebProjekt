import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApixuService} from '../apixu.service';

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

  constructor(private formBuilder: FormBuilder,
              private apixuService: ApixuService) {
  }

  ngOnInit(): void {

  }

  sendToAPIXU(formValues: any): void {
    this.apixuService
      .getWeather(formValues.location)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          this.weatherData = data;
        }
      });
  }


}
