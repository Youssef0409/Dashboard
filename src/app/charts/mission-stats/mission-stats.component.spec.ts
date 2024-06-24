import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionStatsComponent } from './mission-stats.component';

describe('MissionStatsComponent', () => {
  let component: MissionStatsComponent;
  let fixture: ComponentFixture<MissionStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
