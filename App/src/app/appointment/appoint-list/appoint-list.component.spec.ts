import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointListComponent } from './appoint-list.component';

describe('AppointListComponent', () => {
  let component: AppointListComponent;
  let fixture: ComponentFixture<AppointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
