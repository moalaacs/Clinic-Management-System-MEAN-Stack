import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsSectionComponent } from './doctors-section.component';

describe('DoctorsSectionComponent', () => {
  let component: DoctorsSectionComponent;
  let fixture: ComponentFixture<DoctorsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
