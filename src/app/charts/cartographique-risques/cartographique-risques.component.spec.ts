import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographiqueRisquesComponent } from './cartographique-risques.component';

describe('CartographiqueRisquesComponent', () => {
  let component: CartographiqueRisquesComponent;
  let fixture: ComponentFixture<CartographiqueRisquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartographiqueRisquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartographiqueRisquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
