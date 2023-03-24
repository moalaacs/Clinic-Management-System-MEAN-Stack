import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInvoiceReportsComponent } from './daily-invoice-reports.component';

describe('DailyInvoiceReportsComponent', () => {
  let component: DailyInvoiceReportsComponent;
  let fixture: ComponentFixture<DailyInvoiceReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyInvoiceReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyInvoiceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
