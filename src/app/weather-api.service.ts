import { Injectable } from '@angular/core';
import { Weather } from '../weather';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(
    private http: HttpClient) { }
  
  getNUll(){
    return "Hello";
  }
  getWeather(lat: Number, long: Number, systemOfMeasurement: String) : Observable<Weather>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${environment.apiKey}&units=${systemOfMeasurement}`;

    return this.http.get<Weather>(url);

  }
}
