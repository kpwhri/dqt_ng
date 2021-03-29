/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeChartComponent } from './age-chart.component';
import {UIChart} from 'primeng/chart';

describe('AgeChartComponent', () => {
  let component: AgeChartComponent;
  let fixture: ComponentFixture<AgeChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AgeChartComponent,
        UIChart
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
