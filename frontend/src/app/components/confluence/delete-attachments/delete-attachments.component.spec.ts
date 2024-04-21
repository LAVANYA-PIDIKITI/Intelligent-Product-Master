import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttachmentsComponent } from './delete-attachments.component';

describe('DeleteAttachmentsComponent', () => {
  let component: DeleteAttachmentsComponent;
  let fixture: ComponentFixture<DeleteAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAttachmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
