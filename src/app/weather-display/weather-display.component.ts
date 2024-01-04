import { Component } from '@angular/core';
import { Weather } from '../../weather';
import { WeatherAPIService } from '../weather-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css',
  providers: [WeatherAPIService]
}) 
export class WeatherDisplayComponent {
  weather: Weather | null = null;
  time: Date = new Date();
  displayClass: String = "weather-display light";
  location: String = "Toronto, Canada"

  constructor(
    private weatherAPIService: WeatherAPIService
  ){}

  // Grabs toronto weather on initialization
  ngOnInit(){
    //this.weatherAPIService.getWeather(79.3832, 43.6532).subscribe(weather => this.weather = weather);
    this.weatherAPIService.getNUll();
    this.weather = {"coord":{"lon":"43.6532","lat":"79.3832"},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":243.52,"feels_like":236.52,"temp_min":243.52,"temp_max":243.52,"pressure":1006,"humidity":100,"sea_level":1006,"grnd_level":1006},"visibility":4236,"wind":{"speed":6.25,"deg":333,"gust":10.49},"clouds":{"all":100},"dt":1704325250,"sys":{"sunrise":0,"sunset":0, type: "", id: "", message: "", country: ""},"timezone":10800,"id":0,"name":"","cod":200, rain: {"1h": 0, "3h": 0}, snow: {"1h": 0, "3h": 0}}

  }
  
  ngOnChanges(){
    if(document.body.classList.contains('dark-theme')){
      this.displayClass = "weather-display dark";
    } else{
      this.displayClass = "weather-display light"
    }
  }
}
