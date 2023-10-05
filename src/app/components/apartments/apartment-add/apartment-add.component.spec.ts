import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentAddComponent } from './apartment-add.component';

describe('ApartmentAddComponent', () => {
  let component: ApartmentAddComponent;
  let fixture: ComponentFixture<ApartmentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentAddComponent]
    });
    fixture = TestBed.createComponent(ApartmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
