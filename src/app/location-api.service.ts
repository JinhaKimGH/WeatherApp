import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Location } from '../location';

@Injectable({
  providedIn: 'root'
})
export class LocationAPIService {

  constructor(private http: HttpClient) { }

  getLocation(cityName: String) : Observable<Location[]>{
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${environment.apiKey}`;

    return this.http.get<Location[]>(url);
  }
}
