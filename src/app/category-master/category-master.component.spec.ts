/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { CategoryMasterComponent } from './category-master.component';
import {CategoryService} from '../app.service';

describe('CategoryMasterComponent', () => {
  let component: CategoryMasterComponent;
  let fixture: ComponentFixture<CategoryMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMasterComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: CategoryService, useValue: true}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
