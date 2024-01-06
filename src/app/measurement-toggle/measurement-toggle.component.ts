import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-measurement-toggle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './measurement-toggle.component.html',
  styleUrl: './measurement-toggle.component.css'
})
export class MeasurementToggleComponent {
  @Input() systemOfMeasurement: String ='metric';
  @Output() newSystem = new EventEmitter<String>();

  display: String = 'selection light';

  changeSelection(){
    this.newSystem.emit(this.systemOfMeasurement);
  }

  ngAfterContentChecked(){
    if(document.body.classList.contains('dark-theme')){
      this.display = "selection dark";
    } else{
      this.display = "selection light"
    }

  }
}
