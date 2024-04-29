import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveMedicineComponent } from './give-medicine.component';

describe('GiveMedicineComponent', () => {
  let component: GiveMedicineComponent;
  let fixture: ComponentFixture<GiveMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
