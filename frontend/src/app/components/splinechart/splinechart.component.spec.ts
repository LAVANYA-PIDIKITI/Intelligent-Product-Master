import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplinechartComponent } from './splinechart.component';

describe('SplinechartComponent', () => {
  let component: SplinechartComponent;
  let fixture: ComponentFixture<SplinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplinechartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SplinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
