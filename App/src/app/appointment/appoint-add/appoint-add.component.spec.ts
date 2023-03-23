import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointAddComponent } from './appoint-add.component';

describe('AppointAddComponent', () => {
  let component: AppointAddComponent;
  let fixture: ComponentFixture<AppointAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
