import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCommentsComponent } from './footer-comments.component';

describe('FooterCommentsComponent', () => {
  let component: FooterCommentsComponent;
  let fixture: ComponentFixture<FooterCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
