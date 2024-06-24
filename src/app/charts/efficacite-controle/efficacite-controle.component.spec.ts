import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfficaciteControleComponent } from './efficacite-controle.component';

describe('EfficaciteControleComponent', () => {
  let component: EfficaciteControleComponent;
  let fixture: ComponentFixture<EfficaciteControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfficaciteControleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfficaciteControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
