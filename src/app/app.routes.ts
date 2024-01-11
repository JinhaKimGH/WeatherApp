import { Routes } from '@angular/router';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';

export const routes: Routes = [
  {path: 'location/:city/:state/:lat/:lon', component: WeatherDisplayComponent},
  {path: '', redirectTo: '/location/Toronto/Ontario/43.6534817/-79.3839347', pathMatch: 'full'},
];

