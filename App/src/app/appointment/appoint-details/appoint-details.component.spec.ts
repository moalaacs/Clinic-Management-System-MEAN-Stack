import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointDetailsComponent } from './appoint-details.component';

describe('AppointDetailsComponent', () => {
  let component: AppointDetailsComponent;
  let fixture: ComponentFixture<AppointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
