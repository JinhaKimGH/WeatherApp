import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementToggleComponent } from './measurement-toggle.component';

describe('MeasurementToggleComponent', () => {
  let component: MeasurementToggleComponent;
  let fixture: ComponentFixture<MeasurementToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasurementToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
