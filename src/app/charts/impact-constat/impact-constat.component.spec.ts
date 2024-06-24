import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactConstatComponent } from './impact-constat.component';

describe('ImpactConstatComponent', () => {
  let component: ImpactConstatComponent;
  let fixture: ComponentFixture<ImpactConstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactConstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
