import { Injectable } from '@angular/core';
import { WeatherList, Weather } from '../weather';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(
    private http: HttpClient) { }
  
  getTodaysWeather(lat: Number, long: Number, systemOfMeasurement: String) : Observable<Weather>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${environment.apiKey}&units=${systemOfMeasurement}`;
  
    return this.http.get<Weather>(url);

  }

  getFiveDaysWeather(lat: Number, long: Number, systemOfMeasurement: String) : Observable<WeatherList>{
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${environment.apiKey}&units=${systemOfMeasurement}`;

    return this.http.get<WeatherList>(url);
  }

  findDailySummaries(weatherData : Weather[]) : Weather[]{
    let dailySummaries : Weather[] = []
    let currentDay : Date | null = null;

    for (const entry of weatherData){
      const date = new Date(entry.dt_txt);

      // Check if new day
      if(currentDay === null || currentDay.setHours(0,0,0,0) !== date.setHours(0,0,0,0)){
        // Update Current Day
        currentDay = new Date(date);
        // Store summary for previous day
        // Pushed new object, 0 is arbitrary values we will never use
        dailySummaries.push({
          coord: {
            lon: 0,
            lat: 0,
          },
          weather: [{
            id: 0,
            main: entry.weather[0].main,
            description: "",
            icon: entry.weather[0].icon
          }],
          base: "",
          main: {
            temp: 0,
            feels_like: 0,
            pressure: 0,
            humidity: 0,
            temp_min: entry.main.temp_min,
            temp_max: entry.main.temp_max,
            sea_level: 0,
            grnd_level: 0
          },
          visibility: 0,
          wind: {
            speed: 0,
            deg: 0,
            gust: 0,
          },
          clouds: {
            all: 0
          },
          rain: {
            "1h": 0,
            "3h": 0,
          },
          snow: {
            "1h": 0,
            "3h": 0,
          },
          dt: 0,
          sys: {
            type: 0,
            id: 0,
            message: "",
            country: "",
            sunrise: 0,
            sunset: 0,
          },
          timezone: 0,
          id: 0,
          name: "",
          cod: 0,
          dt_txt: new Date(currentDay), 
        });
        
      } else {
        if(dailySummaries[dailySummaries.length - 1].main.temp_min > entry.main.temp_min){
          dailySummaries[dailySummaries.length - 1].main.temp_min = entry.main.temp_min
        }

        if(dailySummaries[dailySummaries.length - 1].main.temp_max < entry.main.temp_max){
          dailySummaries[dailySummaries.length - 1].main.temp_max = entry.main.temp_max
        }

        if(entry.weather[0].main == "Snow" || entry.weather[0].main == "Rain"){
          dailySummaries[dailySummaries.length - 1].weather[0].main = entry.weather[0].main;
          dailySummaries[dailySummaries.length - 1].weather[0].icon = entry.weather[0].icon;
        }
      }
    }

    return dailySummaries
  }
}
