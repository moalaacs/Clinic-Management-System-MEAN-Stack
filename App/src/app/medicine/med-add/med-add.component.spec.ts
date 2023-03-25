import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedAddComponent } from './med-add.component';

describe('MedAddComponent', () => {
  let component: MedAddComponent;
  let fixture: ComponentFixture<MedAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
