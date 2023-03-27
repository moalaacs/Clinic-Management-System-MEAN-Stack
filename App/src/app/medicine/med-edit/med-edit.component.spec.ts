import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedEditComponent } from './med-edit.component';

describe('MedEditComponent', () => {
  let component: MedEditComponent;
  let fixture: ComponentFixture<MedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
