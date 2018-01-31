/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { MainComponent } from './main.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material';
import {CategoryMasterComponent} from '../category-master/category-master.component';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {AgeChartComponent} from '../age-chart/age-chart.component';
import {SubjectTableComponent} from '../subject-table/subject-table.component';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {FormsModule} from '@angular/forms';
import {AccordionModule, DialogModule, MenubarModule, UIChart} from 'primeng/primeng';
import {CategoryComponent} from '../category/category.component';
import {SearchDialogComponent} from '../search-dialog/search-dialog.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        MainComponent
      ],
      imports: [
        FormsModule,
        AccordionModule,
        MenubarModule,
        DialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
