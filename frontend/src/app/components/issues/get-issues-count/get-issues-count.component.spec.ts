import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIssuesCountComponent } from './get-issues-count.component';

describe('GetIssuesCountComponent', () => {
  let component: GetIssuesCountComponent;
  let fixture: ComponentFixture<GetIssuesCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetIssuesCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetIssuesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
