import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAttachmentsComponent } from './get-attachments.component';

describe('GetAttachmentsComponent', () => {
  let component: GetAttachmentsComponent;
  let fixture: ComponentFixture<GetAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAttachmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
