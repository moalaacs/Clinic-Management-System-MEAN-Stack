import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointEditComponent } from './appoint-edit.component';

describe('AppointEditComponent', () => {
  let component: AppointEditComponent;
  let fixture: ComponentFixture<AppointEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
