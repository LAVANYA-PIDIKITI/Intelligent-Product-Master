import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionIssueComponent } from './transition-issue.component';

describe('TransitionIssueComponent', () => {
  let component: TransitionIssueComponent;
  let fixture: ComponentFixture<TransitionIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransitionIssueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransitionIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
