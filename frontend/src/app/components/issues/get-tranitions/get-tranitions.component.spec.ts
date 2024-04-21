import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTranitionsComponent } from './get-tranitions.component';

describe('GetTranitionsComponent', () => {
  let component: GetTranitionsComponent;
  let fixture: ComponentFixture<GetTranitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetTranitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetTranitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
