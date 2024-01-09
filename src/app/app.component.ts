import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { MeasurementToggleComponent } from './measurement-toggle/measurement-toggle.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    WeatherDisplayComponent, 
    ThemeToggleComponent, 
    FormsModule,
    MeasurementToggleComponent,
    SearchBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WeatherApp';
  systemOfMeasurement : String = 'metric';

  changeSystem(system: String){
    if(system == 'metric'){
      this.systemOfMeasurement = 'metric';
    } else{
      this.systemOfMeasurement = 'imperial';
    }
  }
}
