import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitiesSectionComponent } from './specialities-section.component';

describe('SpecialitiesSectionComponent', () => {
  let component: SpecialitiesSectionComponent;
  let fixture: ComponentFixture<SpecialitiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialitiesSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialitiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
