import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportValidationComponent } from './rapport-validation.component';

describe('RapportValidationComponent', () => {
  let component: RapportValidationComponent;
  let fixture: ComponentFixture<RapportValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
