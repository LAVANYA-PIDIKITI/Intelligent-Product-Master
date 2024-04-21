import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIssueComponent } from './get-issue.component';

describe('GetIssueComponent', () => {
  let component: GetIssueComponent;
  let fixture: ComponentFixture<GetIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetIssueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
