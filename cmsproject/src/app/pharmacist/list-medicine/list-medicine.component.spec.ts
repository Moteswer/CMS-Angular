import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicineComponent } from './list-medicine.component';

describe('ListMedicineComponent', () => {
  let component: ListMedicineComponent;
  let fixture: ComponentFixture<ListMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
