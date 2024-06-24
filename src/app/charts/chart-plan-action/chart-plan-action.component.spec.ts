import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPlanActionComponent } from './chart-plan-action.component';

describe('ChartPlanActionComponent', () => {
  let component: ChartPlanActionComponent;
  let fixture: ComponentFixture<ChartPlanActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPlanActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPlanActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
