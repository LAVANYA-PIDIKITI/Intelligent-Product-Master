import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPageComponent } from './specific-page.component';

describe('SpecificPageComponent', () => {
  let component: SpecificPageComponent;
  let fixture: ComponentFixture<SpecificPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
