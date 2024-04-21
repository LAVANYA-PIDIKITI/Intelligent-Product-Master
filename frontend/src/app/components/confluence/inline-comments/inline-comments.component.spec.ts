import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCommentsComponent } from './inline-comments.component';

describe('InlineCommentsComponent', () => {
  let component: InlineCommentsComponent;
  let fixture: ComponentFixture<InlineCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InlineCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
