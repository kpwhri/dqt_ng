/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { MainComponent } from './main.component';
import {FormsModule} from '@angular/forms';
import {AccordionModule, DialogModule, MenubarModule, UIChart} from 'primeng';

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
