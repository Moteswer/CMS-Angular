import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookappointmentComponent } from './new-bookappointment.component';

describe('NewBookappointmentComponent', () => {
  let component: NewBookappointmentComponent;
  let fixture: ComponentFixture<NewBookappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBookappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
