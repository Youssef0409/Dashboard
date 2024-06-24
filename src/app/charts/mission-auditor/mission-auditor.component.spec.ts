import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionAuditorComponent } from './mission-auditor.component';

describe('MissionAuditorComponent', () => {
  let component: MissionAuditorComponent;
  let fixture: ComponentFixture<MissionAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionAuditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
