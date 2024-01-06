import { Component, Input } from '@angular/core';
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
  @Input() systemOfMeasurement: String = '';
  @Input() location = "Toronto, Canada";

  weatherData: Weather = {"coord":{"lon":-79.347,"lat":43.6511},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":-3.16,"feels_like":-8.62,"temp_min":-4.7,"temp_max":-2.66,"pressure":1025,"humidity":70,"sea_level":0,"grnd_level":0},"visibility":10000,"wind":{"speed":4.63,"deg":260,"gust":0},"clouds":{"all":100},"dt":1704424273,"sys":{"type":2,"id":2040045,"country":"CA","sunrise":1704372654,"sunset":1704405180, "message":""},"timezone":-18000,"id":6176177,"name":"Ward's Island","cod":200, "rain": {"1h": 0, "3h": 0}, "snow": {"1h": 0, "3h": 0}};
  weatherIconUrl: String = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}/@2x.png`;
  time: Date = new Date();
  displayClass: String = "weather-display light";

  constructor(
    private weatherAPIService: WeatherAPIService
  ){}

  findWeatherDetails(){
    this.weatherIconUrl = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
    // TODO: ADD INPUT FOR WEATHER LOCATION
  }

  // Grabs toronto weather on initialization
  ngOnInit(){
    //this.weatherAPIService.getWeather(43.651070, -79.347015, this.systemOfMeasurement).subscribe(weather => this.weather = weather);
    this.weatherAPIService.getNUll();
    this.weatherData = {"coord":{"lon":-79.347,"lat":43.6511},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":-3.16,"feels_like":-8.62,"temp_min":-4.7,"temp_max":-2.66,"pressure":1025,"humidity":70,"sea_level":0,"grnd_level":0},"visibility":10000,"wind":{"speed":4.63,"deg":260,"gust":0},"clouds":{"all":100},"dt":1704424273,"sys":{"type":2,"id":2040045,"country":"CA","sunrise":1704372654,"sunset":1704405180, "message":""},"timezone":-18000,"id":6176177,"name":"Ward's Island","cod":200, "rain": {"1h": 0, "3h": 0}, "snow": {"1h": 0, "3h": 0}};
    this.findWeatherDetails();
  }
  
  ngAfterContentChecked(){
    if(document.body.classList.contains('dark-theme')){
      this.displayClass = "weather-display dark";
    } else{
      this.displayClass = "weather-display light"
    }

  }
}
