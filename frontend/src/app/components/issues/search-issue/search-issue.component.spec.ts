import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIssueComponent } from './search-issue.component';

describe('SearchIssueComponent', () => {
  let component: SearchIssueComponent;
  let fixture: ComponentFixture<SearchIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchIssueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
