import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedListComponent } from './med-list.component';

describe('MedListComponent', () => {
  let component: MedListComponent;
  let fixture: ComponentFixture<MedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
