import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPartnersSectionComponent } from './brand-partners-section.component';

describe('BrandPartnersSectionComponent', () => {
  let component: BrandPartnersSectionComponent;
  let fixture: ComponentFixture<BrandPartnersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandPartnersSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandPartnersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
