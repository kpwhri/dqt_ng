/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgeChartComponent } from './age-chart.component';
import {UIChart} from 'primeng';
import {AgeGraphClass} from '../categories';

describe('AgeChartComponent', () => {
  let component: AgeChartComponent;
  let fixture: ComponentFixture<AgeChartComponent>;

  beforeEach(async(() => {
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
