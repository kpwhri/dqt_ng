import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {CategoryService} from "./app.service";
import { GraphComponent } from './graph/graph.component';
import { ChartComponent } from './chart/chart.component';
import { BarGraphDirective } from './bar-graph.directive';
import { BarchartComponent } from './barchart/barchart.component';
import { SliderModule } from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import { CheckboxValueComponent } from './checkbox-value/checkbox-value.component';
import {RatingModule} from "primeng/primeng";

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ChartComponent,
    BarGraphDirective,
    BarchartComponent,
    CheckboxValueComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SliderModule,
    ToggleButtonModule,
    RatingModule,
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
