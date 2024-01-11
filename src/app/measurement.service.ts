import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  measurementSource = new BehaviorSubject<string>('');

  systemOfMeasurement$ = this.measurementSource.asObservable();

  updateData(data: string){ 
    this.measurementSource.next(data);
  }

}
