import { Component } from '@angular/core';
import { Weather } from '../../weather';
import { WeatherAPIService } from '../weather-api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MeasurementService } from '../measurement.service';

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
  systemOfMeasurement: String = "metric";
  prevMeasurement : String = "metric";
  location : String | null = 'Toronto, Ontario';

  weatherData: Weather = {"coord":{"lon":-79.347,"lat":43.6511},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":-3.16,"feels_like":-8.62,"temp_min":-4.7,"temp_max":-2.66,"pressure":1025,"humidity":70,"sea_level":0,"grnd_level":0},"visibility":10000,"wind":{"speed":4.63,"deg":260,"gust":0},"clouds":{"all":100},"dt":1704424273,"sys":{"type":2,"id":2040045,"country":"CA","sunrise":1704372654,"sunset":1704405180, "message":""},"timezone":-18000,"id":6176177,"name":"Ward's Island","cod":200, "rain": {"1h": 0, "3h": 0}, "snow": {"1h": 0, "3h": 0}};
  weatherIconUrl: String = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}/@2x.png`;
  time: Date = new Date();
  displayClass: String = "weather-display light";

  constructor(
    private weatherAPIService: WeatherAPIService,
    private route: ActivatedRoute,
    private sharedService: MeasurementService
  ){}

  lat : Number = Number(this.route.snapshot.paramMap.get('lat'));
  lon : Number= Number(this.route.snapshot.paramMap.get('lon'));

  // Gets weather Icon
  findWeatherDetails(){
    this.weatherIconUrl = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
  }

  // Calls the API with the parameters and updates the longitude, latitude and location
  callAPI(){
    this.lat = Number(this.route.snapshot.paramMap.get('lat'));

    this.lon = Number(this.route.snapshot.paramMap.get('lon'));

    this.location =`${this.route.snapshot.paramMap.get('city')} ${this.route.snapshot.paramMap.get('state') == 'undefined' ? "" : "," +  this.route.snapshot.paramMap.get('state')}`;

    this.weatherAPIService.getWeather(this.lat, this.lon, this.systemOfMeasurement).subscribe(weather => this.weatherData = weather);
    
    this.findWeatherDetails();
  }

  // Grabs weather on initialization
  ngOnInit(){
    // Subscribes to changes in the shared measurement service
    this.sharedService.systemOfMeasurement$.subscribe((data) => {
      this.systemOfMeasurement = data;
    });

    // Calls the api
    this.systemOfMeasurement = "metric";
    this.callAPI();

  }

  ngAfterContentChecked(){
    // Checks if latitude/longitude/system of measurement changed
    if(this.lat != Number(this.route.snapshot.paramMap.get('lat')) || this.lon != Number(this.route.snapshot.paramMap.get('lon')) || (this.systemOfMeasurement != this.prevMeasurement && (this.systemOfMeasurement == "imperial" || this.systemOfMeasurement == "metric"))){
      
      // Updates prevMeasurement
      this.prevMeasurement = this.systemOfMeasurement;
      this.callAPI()
    }

    // If the body classlist contains the dark-theme, we switch our display theme to dark
    if(document.body.classList.contains('dark-theme')){
      this.displayClass = "weather-display dark";
    } else{
      this.displayClass = "weather-display light"
    }

  }
}
