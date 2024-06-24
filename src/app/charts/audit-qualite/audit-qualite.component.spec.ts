import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditQualiteComponent } from './audit-qualite.component';

describe('AuditQualiteComponent', () => {
  let component: AuditQualiteComponent;
  let fixture: ComponentFixture<AuditQualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditQualiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
