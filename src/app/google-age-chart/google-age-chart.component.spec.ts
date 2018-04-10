import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAgeChartComponent } from './google-age-chart.component';

describe('GoogleAgeChartComponent', () => {
  let component: GoogleAgeChartComponent;
  let fixture: ComponentFixture<GoogleAgeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAgeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAgeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
