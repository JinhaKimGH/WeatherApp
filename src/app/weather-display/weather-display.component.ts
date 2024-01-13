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

  // Measurement strings
  systemOfMeasurement: String = "metric";
  prevMeasurement : String = "metric";

  // Location string
  location : String | null = '';

  // Sunrise and Sunset times
  sunrise : Date | null = null;
  sunset : Date | null = null;

  // Weather Data
  weatherData: Weather | null = null;

  // Current Time
  time: Date = new Date();

  // Display Class (Light/Dark Mode)
  displayClass: String = "weather-display light";

  // Hourly and Daily Weather Arrays
  hourlyWeather : Weather[] = [];
  dailyWeather : Weather[] = [];
  
  // Constructor initilializing services and route
  constructor(
    private weatherAPIService: WeatherAPIService,
    private route: ActivatedRoute,
    private sharedService: MeasurementService
    ){}
    
  // Grabs the latitude, longitude, and city from route parameters
  lat : Number = Number(this.route.snapshot.paramMap.get('lat'));
  lon : Number= Number(this.route.snapshot.paramMap.get('lon'));
  city: String = String(this.route.snapshot.paramMap.get('city'));

  // Calls the API with the parameters and updates the longitude, latitude and location
  callAPI(){
    // Grabs the latitude, longitude, and city from the route parameters
    this.lat = Number(this.route.snapshot.paramMap.get('lat'));

    this.lon = Number(this.route.snapshot.paramMap.get('lon'));

    this.city = String(this.route.snapshot.paramMap.get('city'));

    // Subscribes to the weatherAPIService for next five days
    this.weatherAPIService.getFiveDaysWeather(this.lat, this.lon, this.systemOfMeasurement).subscribe(weather => {
      // Gets the list of weather data for the hourly
      this.hourlyWeather = weather.list.slice(0, 8);

      // Gets list of daily weather
      this.dailyWeather = this.weatherAPIService.findDailySummaries(weather.list);

      // Grabs the sunset and sunrise times from the weatherAPIService, also converts from unix to js timestamp
      this.sunrise = new Date(weather.city.sunrise * 1000);
      this.sunset = new Date(weather.city.sunset * 1000);

      // Grabs the location off the weatherAPIService
      this.location =`${this.city}${weather.city?.country ? ", " + weather.city?.country : ""}`;
    }, error => {
      
    });

    // Subscribes for Today's weather
    this.weatherAPIService.getTodaysWeather(this.lat, this.lon, this.systemOfMeasurement).subscribe(weather => {
      this.weatherData = weather;
    }, error => {
      this.weatherData = null;
    });

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

  getWeatherIconSrc(weather: Weather): string{
    return `https://openweathermap.org/img/wn/${weather ?  weather.weather[0].icon : ""}@2x.png`;
  }

}
