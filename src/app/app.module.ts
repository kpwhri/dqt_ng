import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Headers, Http} from '@angular/http';

import { AppComponent } from './app.component';
import {CategoryService} from "./app.service";
import { GraphComponent } from './graph/graph.component';
import { ChartComponent } from './chart/chart.component';
import { BarGraphDirective } from './bar-graph.directive';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ChartComponent,
    BarGraphDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
