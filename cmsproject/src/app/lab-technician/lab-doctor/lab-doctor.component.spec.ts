import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDoctorComponent } from './lab-doctor.component';

describe('LabDoctorComponent', () => {
  let component: LabDoctorComponent;
  let fixture: ComponentFixture<LabDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
