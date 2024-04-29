import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedBillComponent } from './med-bill.component';

describe('MedBillComponent', () => {
  let component: MedBillComponent;
  let fixture: ComponentFixture<MedBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
