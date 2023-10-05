import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueAddComponent } from './due-add.component';

describe('DueAddComponent', () => {
  let component: DueAddComponent;
  let fixture: ComponentFixture<DueAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DueAddComponent]
    });
    fixture = TestBed.createComponent(DueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
